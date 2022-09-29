import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { countryCodeJson } from 'src/app/shared/Constants/countrycode';
import { OtpVerificationComponent } from 'src/app/shared/otp-verification/otp-verification.component';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastService: ToasterService,
    private registrationService: RegistrationService,
    private commonService: CommonFunctionService,
  ) {

   }
  designations=[];
  countryCodes = countryCodeJson;
  imageFile:any
  userDetails:any={}
  ngOnInit(): void {
    this.getDesignation()
    this.getUserDetails()

  }
  getUserDetails(){
    let loginData = JSON.parse(sessionStorage.getItem('loginData')??'')
    this.registrationService.getUser(loginData.id).subscribe((res:any)=>{
      if(res && res.data.length){
        this.profileForm.patchValue(res['data'][0]);
        this.imageFile = res['data'][0].file;
        this.profileForm.controls['contactNo'].patchValue({
          number:res['data'][0].contactNo,
          countryCode:res['data'][0].countryCode,
        })
      }
    })
  }

    profileForm = this.fb.group({
      firstName: ['', Validators.required],
      designationId: ['' ,Validators.required],
      emailId: ['', [Validators.required,Validators.pattern('[A-Za-z0-9._-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      contactNo: this.fb.group({
        countryCode: ['+91'],
        number: ['',[Validators.required]]
      }),
      file:['']
    })
    get profileFormControl() {
      return this.profileForm.controls;
    }
    get contactFormControl() {
      return (this.profileForm.controls['contactNo'] as FormGroup).controls
    }
  
  getDesignation() {
    this.registrationService.getDesignation().subscribe((res: any) => {
      this.designations = res['data'];
      console.log(this.designations)
    })
  }
  openOtpVerificationDialog(otpData='') {
    console.log('called');
    const dialogRef = this.dialog.open(OtpVerificationComponent, {
      width: '400px',
      data: { formData:{emailId: this.profileForm.value.emailId},formType:'save' ,label:'Save Changes',showEmail:false},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (!result) return;
      if (result.eventType == 'submit') {
        this.userDetails = {...this.userDetails,otp:result.otp}
        this.updateUser()
      }
      if (result.eventType == 'resendOtp') {
        this.saveProfile()
      }
    });
  }
  imageInputClickHandler(event:any) {
    document.getElementById('description-upload')?.click();
  }
  docsInputChangeHandler(event:any) {
    // this.openSnackBar(['Updating Form Icon..'], 5000);
    this.toastService.showNotification('loading','Upload')
    let image = {
      type: event.target.files[0].type,
      name: event.target.files[0].name,
      file: event.target.files[0],
    };
    this.setDocuments(image);

  }
   async setDocuments(imgObject:any) {
      this.commonService.uploadTos3(imgObject.name, imgObject.type).subscribe((res:any)=>{
        if (res['success']) {
          this.profileForm.patchValue({
            file: res['data'][0]['file_url']
          })
          try {
            this.commonService.getImageUrl(
              res['data'][0]['url'],
              imgObject.file
            ).subscribe(res=>{
            },error=>{
            },()=>{
              this.profileForm.patchValue({
                file: res['data'][0]['file_url']
              })
              this.imageFile = res['data'][0]['file_url'];
              this.toastService.dismiss()
              this.toastService.showNotification('success','Image Uploaded Succesfully!')
            })

          } catch (e) {
            this.toastService.showNotification('error','Unable to save image');
            console.error(e);
          }
        }
      });
  }


  saveProfile(){
    this.registrationService.getUserUpdateOtp(this.profileForm.value).subscribe((res:any)=>{
      this.userDetails = {...this.profileForm.value,otpTxnId:res['data'].otpTxnId}
      this.openOtpVerificationDialog()
    })
  }
  updateUser(){
    this.registrationService.updateUser(this.userDetails).subscribe((res:any)=>{
      this.toastService.showNotification('success','User Updated Succefully!')
      const {emailId,firstName,designation,contactNo,file} = res['data'];
      let loginDataObject = JSON.parse(sessionStorage.getItem('loginData')??'');
       loginDataObject = {...loginDataObject,emailId:emailId,firstName:firstName,designation:designation,contactNo:contactNo,file:file};
       sessionStorage.setItem('loginData',JSON.stringify(loginDataObject));
       this.commonService.loginDataUpdate.next(true)
      this.commonService.navigateToSpecificPage('/user-profile')
    },
    (error) => {
      if (error.error.message == 'Invalid OTP!') {
        this.openOtpVerificationDialog();
      }
    })
  }

}
