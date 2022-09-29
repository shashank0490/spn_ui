import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { MustMatch } from 'src/app/shared/Validators/MustMatch';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-password-reset',
  templateUrl: './profile-password-reset.component.html',
  styleUrls: ['./profile-password-reset.component.scss']
})
export class ProfilePasswordResetComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastService: ToasterService,
    private registrationService: RegistrationService,
    private commonService: CommonFunctionService,
  ) { }
    show=false;
    shows =false;
    showOld = false
  ngOnInit(): void {
    this.initiatePasswordReset()
  }
  passwordResetPayload = {
    emaildId:'',
    oldPassword:'',
    newPassword:'',
    confirmPassword:'',
    reset_password_token:'',
    random:''
  }
  passwordResetForm = this.fb.group({
    oldPassword: ['',[Validators.required]],
    newPassword: ['',[Validators.required, Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@%^&*-]).{8,}$')]],
    confirmPassword:['',[Validators.required]],
  }, {
    validator: MustMatch('newPassword', 'confirmPassword')
  })
  get passwordResetFormControl() {
    return this.passwordResetForm.controls;
  }
  showPassword() {
    this.show = !this.show
  }

  showRenterPassword() {
    this.shows = !this.shows
  }
  showOldPassword() {
    this.showOld = !this.showOld
  }
  initiatePasswordReset(){
    let emailId = JSON.parse(sessionStorage.getItem('loginData')??'').emailId;
    this.registrationService.resetUserPasswordInitialize({emailId:emailId}).subscribe((res:any)=>{
      this.passwordResetPayload = {...this.passwordResetPayload,...res.data,emailId:emailId}
    })
  }
/**
 * We are encrypting the old password with the secret key and then encrypting the encrypted password
 * with a random key
 */
  submitReset(){
    // here we are encrypted old password with key random to decrypt at backend level.
    let ciphertext = this.commonService.getSecretKey(environment.secretKey, this.passwordResetForm.value.oldPassword)
    const random = Math.random();
    let randomKey = random.toString()
    let encryptCiphertextRandom = this.commonService.getSecretKey(randomKey, ciphertext)
    //  encrypted old password two times
    let encryptedNewPassword = this.commonService.getSecretKey(environment?.secretKey, this.passwordResetForm.value.newPassword)
    let encryptedConfirmPassword = this.commonService.getSecretKey(environment?.secretKey, this.passwordResetForm.value.confirmPassword);
    this.passwordResetPayload = {
      ...this.passwordResetPayload,
      random:randomKey,
      oldPassword:encryptCiphertextRandom,
      newPassword:encryptedNewPassword,
      confirmPassword:encryptedConfirmPassword
    }
    console.log(this.passwordResetPayload)
    this.registrationService.resetUserPassword(this.passwordResetPayload).subscribe((res:any)=>{
      this.toastService.showNotification('success',res.message)
      this.commonService.navigateToSpecificPage('/user-profile')
    })
  }
}
