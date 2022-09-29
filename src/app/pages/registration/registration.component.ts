import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpVerificationComponent } from '../../shared/otp-verification/otp-verification.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationService } from "../../services/registration/registration.service";
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { countryCodeJson } from '../../shared/Constants/countrycode';
import { MustMatch } from 'src/app/shared/Validators/MustMatch';
import { ToasterService } from 'src/app/services/toaster.service';
import { environment } from 'src/environments/environment';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ActivatedRoute } from '@angular/router';
import { digits } from 'src/app/shared/Constants/restrict-char';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component | undefined;
  @ViewChild('langInput') langInput: ElementRef | undefined;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio' = 'image';
  allowedChar = digits


  countryCodes = countryCodeJson
  registrationForm!: FormGroup;
  step = 1;
  next_step: boolean = false;
  submitted: boolean = false;
  show: boolean = false;
  isSubmitBtnDisabled: boolean = false;
  shows: boolean = false;
  designations: any = []
  step2FormControlNames = ['firstName', 'designationId', 'emailId', 'contactNo', 'password', 'confirmPassword', 'consent'];
  newlyCreatedOrganisationData: any;
  progressBar: number = 0;
  @Input() viewMode: string = 'normal';
  @Output() joinEventEmitter = new EventEmitter();
  otpTxnId: string = ''
  invalidWebsite: boolean = false
  recaptchaSiteKey: any = environment.captchaSecretKet
  orgExist: boolean = false
  recaptcha: any;
  orgSuccessCode: string = '';
  progressWidth: number = 0;
  timeout: any = null;
  organisationData: any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastService: ToasterService,
    private registrationService: RegistrationService,
    private commonService: CommonFunctionService,
    private activatedRoute :ActivatedRoute
  ) {
    if(!!sessionStorage.getItem('token')){
      this.commonService.navigateToSpecificPage('/ngo-landing')
      return
    }

    this.activatedRoute.queryParams.subscribe(res=>{
      if(res['txnId']){
        // this.get
        this.getOrgByTxnId(res['txnId'])
      }
    })

   }

  ngOnInit() {
    sessionStorage.clear();
    this.commonService.showFooter.next(false);
    this.commonService.showTopBar.next(false);
    this.initializeRegistrationForm();
    this.listenToFormControls();
    this.getDesignation();
    this.registrationForm.valueChanges.subscribe((res: any) => {
      let temp = 0;
      for (let key of Object.keys(this.registerFormControl)) {
        if (this.registerFormControl[key].dirty && this.registerFormControl[key].valid) {
          temp += 10;
        }
      }
      this.progressBar = temp;
    })
    // for (const controlName of this.step2FormControlNames) {
    //   this.setValidators(controlName);
    // }
  }

  /**
   * It creates a form group with the following fields: pancard, name, website, aboutInn, firstName,
   * designationId, ngoProfileId, emailId, recaptcha, consent, contactNo, password, confirmPassword.
   * 
   * The contactNo field is a form group with the following fields: countryCode, number.
   * 
   * The password and confirmPassword fields have a custom validator that checks if the values of the two
   * fields match.
   * 
   * The form group has a custom validator that checks if the values of the password and confirmPassword
   * fields match.
   */
  initializeRegistrationForm() {
    this.registrationForm = this.fb.group({
      pancard: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      name: ['', Validators.required],
      website: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      aboutInn: ['',[Validators.required]],
      firstName: [''],
      designationId: [''],
      ngoProfileId: [''],
      emailId: ['', Validators.pattern('[A-Za-z0-9._-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')],
      // contactNo:[''],
      recaptcha: ['', Validators.required],
      consent: [''],
      contactNo: this.fb.group({
        countryCode: ['+91'],
        number: ['']
      }),
      password: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
    },

      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }
  //remove the validations of password from above for staging

  /**
   * It listens to the value changes of the emailId form control and if there are no errors, it sets the
   * isSubmitBtnDisabled to false.
   */
  private listenToFormControls() {
    this.registrationForm.controls.emailId.valueChanges.subscribe((data: any) => {
      console.log('listenToFormControls', data);
      console.log('Form', this.registrationForm.controls);
      if (!this.registrationForm.controls.emailId.errors) {
        this.isSubmitBtnDisabled = false;
        // this.openOtpVerificationDialog();
      }
    });
  }

  get registerFormControl() {
    return this.registrationForm.controls;
  }
  get contactFormControl() {
    return (this.registrationForm.controls['contactNo'] as FormGroup).controls
  }


  submitForm() {
    console.log(this.registrationForm.value);
    this.submitted = true;
  }

  /**
   * It appends a script tag to the body of the page, and if the script tag loads, it sets the
   * invalidWebsite variable to false, and if the script tag fails to load, it sets the invalidWebsite
   * variable to true.
   * @param {string} url - string - the url to check
   * @returns The script is being returned.
   */
  checkServerStatus(url: string) {
    if (!url) {
      this.invalidWebsite = false
      return
    }
    url = url.includes('https://') ? url : `https://${url}`
    let script = document.body.appendChild(document.createElement('script'));
    var $this = this;
    script.onload = function () {
      $this.invalidWebsite = false
      // document.getElementById('website_url')?.classList.add('ng-valid')
    };
    script.onerror = function () {
      $this.invalidWebsite = true
      // document.getElementById('website_url')?.classList.add('ng-invalid')
      // document.getElementById('website_url')?.classList.remove('ng-valid')

    };
    script.src = url;
  }

  // name = 'how to trigger an event in input text after i stop typing/writing angular ';
  /**
   * If the key pressed is not the enter key, then check the server status.
   * @param {any} event - any -&gt; this is the event that is triggered when the user types in the input box.
   */
  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.checkServerStatus(event.target.value);
      }
    }, 800);
  }

  /**
   * It takes the value of the pancard field and sends it to the backend to check if the organisation
   * exists. If it does, it fills the name and website fields with the data from the backend. If it
   * doesn't, it resets the name and website fields.
   */
   getOrgByTxnId(txnId='') {
    this.registrationService.getOrganisationByTxnId(txnId).subscribe((res: any) => {
      if (res.data.length) {
        this.organisationData = res['data'];
        this.orgExist = true;
        const {id} = res['data'];
        this.registrationForm.patchValue({ ...res['data'][0], ngoProfileId: id});
        console.log(this.registrationForm);
      } else {
        this.orgExist = false;
        this.registrationForm.controls['aboutInn'].enable();
        this.registrationForm.controls['aboutInn'].patchValue('')
        this.registrationForm.controls['pancard'].enable();
        this.registrationForm.controls['name'].enable();
        this.registrationForm.controls['website'].enable();
        this.registrationForm.controls['name'].patchValue('')
        this.registrationForm.controls['website'].patchValue('')
      }
    })
  }
  getOrgByPan() {
    console.log('value', this.registerFormControl.pancard.value)
    if (this.registerFormControl.pancard.value?.length == 10) {
      this.registrationService.getOrganisationByPan(this.registerFormControl.pancard.value).subscribe((res: any) => {
        if (res.data.length) {
          this.organisationData = res['data'];
          this.orgExist = true;
          const { id } = res['data']
          this.registrationForm.patchValue({ ...res['data'][0], ngoProfileId: id });
          console.log(this.registrationForm);
        } else {
          this.orgExist = false;
          this.registrationForm.controls['aboutInn'].enable();
          this.registrationForm.controls['aboutInn'].patchValue('')
          this.registrationForm.controls['name'].enable();
          this.registrationForm.controls['website'].enable();
          this.registrationForm.controls['name'].patchValue('')
          this.registrationForm.controls['website'].patchValue('')
        }
      })
    }
  }

  next() {
    if (this.step == 1) {
      this.next_step = true;
      this.createOrganisation();
    }
    if (this.step == 2) {
      if (this.isSubmitBtnDisabled) {
        console.log('inside if', `${this.isSubmitBtnDisabled}`);
      }
    }
  }

  /**
   * trying to create an organisation and then patch the form with the newly created organisation's
   * data.
   */
  createOrganisation() {
    const orgContent = {
      pancard: this.registrationForm.value.pancard,
      name: this.registrationForm.value.name,
      website: this.registrationForm.value.website,
      aboutInn: this.registrationForm.value.aboutInn,
      recaptcha: this.registrationForm.value.recaptcha
    };
    if (!orgContent?.website) {
      delete orgContent?.website
    }
    this.registrationService.createOrganisation(orgContent).subscribe((response: any) => {
      if (response.success) {
        this.captchaElem?.resetCaptcha();
        this.toastService.showNotification( this.orgExist? 'info' : 'success', this.orgExist ? 'Organization already exist' : 'Organization created successfully');
        this.orgSuccessCode = response.code;
        this.newlyCreatedOrganisationData = response.data;
        console.log('orgSuccessCode', this.orgSuccessCode)
        this.newlyCreatedOrganisationData['recaptcha'] = this.recaptcha;
        this.registrationForm.patchValue({ ngoProfileId: this.newlyCreatedOrganisationData.id, ...this.newlyCreatedOrganisationData })
        console.log('registrationForm', this.registrationForm)
        this.initializeStep2Form();
      }
    }, (error) => {
      // this.toastService.showNotification('error',`${error.error.message}`);
      console.log(error);
    });
  }

  /**
   * It takes a number as an argument and returns a string.
   * @param {any} otp - any -&gt; this is the otp that the user enters in the dialog box
   */
  createUser(otp: any) {
    let password = this.registrationForm.value.password
    let confirmPassword = this.registrationForm.value.confirmPassword;
    let encryptedPassword = this.commonService.getSecretKey(environment?.secretKey, password)
    let encryptedConfirmPassword = this.commonService.getSecretKey(environment?.secretKey, confirmPassword)
    console.log(this.registrationForm.value.contactNo)
    let newUser: any = {
      "firstName": this.registrationForm.value.firstName,
      "lastName": "",
      "contactNo": this.registrationForm.value.contactNo,
      "emailId": this.registrationForm.value.emailId,
      "ngoProfileId": this.registrationForm.value.ngoProfileId,
      "designationId": parseInt(this.registrationForm.value.designationId),
      "password": encryptedPassword,
      "confirmPassword": encryptedConfirmPassword,
      "otpTxnId": this.otpTxnId,
      "otp": otp
    }

    this.registrationService.createUser(newUser).subscribe((response: any) => {
      this.toastService.showNotification('success', 'User Created Successfully');
      this.newlyCreatedOrganisationData = response?.data;
      this.commonService.isTokenAvailable.next(true);

      sessionStorage.setItem('token', response?.token);
      const {emailId,firstName,designation,contactNo,file} = response['data'];
      let loginDataObject = response['data'];
      loginDataObject = {...loginDataObject,emailId:emailId,firstName:firstName,designation:designation,contactNo:contactNo,file:file};
      sessionStorage.setItem('loginData',JSON.stringify(loginDataObject))
      this.commonService.loginDataUpdate.next(true)
      this.commonService.navigateToSpecificPage('ngo-landing');
      }, (error) => {
      if (error.error.message == 'Invalid OTP!') {
        this.openOtpVerificationDialog();
      }
      // this.toastService.showNotification('error',`${error.error.message}`);
    });
  }

  /**
   * It's a function that calls a service that makes an http request to an api that returns a list of
   * designations.
   */
  getDesignation() {
    this.registrationService.getDesignation().subscribe((res: any) => {
      this.designations = res['data'];
      console.log(this.designations)
    })
  }

  /**
   * It loops through an array of control names, and for each control name, it calls a function that sets
   * the validators for that control.
   */
  initializeStep2Form() {
    this.step++;
    this.isSubmitBtnDisabled = true;
    for (const controlName of this.step2FormControlNames) {
      this.setValidators(controlName);
    }
    console.log('registerFormControl', this.registerFormControl)
  }

  /**
   * If the password and confirmPassword fields are the same, return null, otherwise return an object
   * with a key of notSame and a value of true
   * @param {FormGroup} group - FormGroup - The FormGroup that is being validated.
   * @returns null if the passwords match, otherwise it returns an object with a property called notSame.
   */
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  /**
   * It removes the recaptcha control from the form, and then sets the validators for the control that
   * was clicked.
   * @param {string} controlName - The name of the control you want to set the validators for.
   */
  setValidators(controlName: string) {
    console.log('setValidators', controlName)
    if (controlName == 'recaptcha') {
      this.registrationForm.removeControl('recaptcha');
    }
    if (controlName == 'emailId') {
      this.registrationForm.controls[controlName].setValidators([Validators.required, Validators.pattern('[A-Za-z0-9._-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]);
      this.registrationForm.controls[controlName].updateValueAndValidity;
    } else if (controlName == 'confirmPassword' || controlName == 'password') {
      this.registrationForm.controls[controlName].setValidators([
        Validators.required,
        Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@%^&*-]).{8,}$'),
        Validators.minLength(8)
      ]);
      this.registrationForm.controls[controlName].updateValueAndValidity;
    } else if (controlName == 'contactNo') {
      // (this.registrationForm.controls['contactNo'] as FormGroup).controls['number'].setValidators([Validators.minLength(6), Validators.maxLength(10), Validators.required ]);
      (this.registrationForm.controls['contactNo'] as FormGroup).controls['number'].setValidators([Validators.minLength(6), Validators.maxLength(10)]);
      (this.registrationForm.controls['contactNo'] as FormGroup).controls['number'].updateValueAndValidity();
      this.registrationForm.controls[controlName].updateValueAndValidity;
    } else if (controlName == 'consent') {
      this.registrationForm.controls[controlName].setValidators([Validators.requiredTrue]);
      this.registrationForm.controls[controlName].updateValueAndValidity;
    } else {
      this.registrationForm.controls[controlName].setValidators([Validators.required]);
      this.registrationForm.controls[controlName].updateValueAndValidity;
    }
  }

  showPassword() {
    this.show = !this.show
  }

  showRenterPassword() {
    this.shows = !this.shows
  }

  /**
   * It opens a dialog box, and when the dialog box is closed, it checks if the user has submitted the
   * form or requested for a new OTP. If the user has submitted the form, it calls the createUser
   * function. If the user has requested for a new OTP, it calls the sendOtp function.
   */
  openOtpVerificationDialog() {
    const dialogRef = this.dialog.open(OtpVerificationComponent, {
      width: '400px',
      data: { formData: { emailId: this.registrationForm.value.emailId } , label:'Continue to Profile' , showEmail:true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (!result) return
      if (result.eventType == 'submit') {
        this.createUser(result.otp);
      }
      if (result.eventType == 'resendOtp') {
        this.sendOtp()
      }
    });
  }

  onNoClick(): void {
    this.dialog.closeAll();
    // this.createUser()
  }

  /**
   * It takes the input from the user and if the length of the input is 10, it calls the verifyPan
   * function from the registrationService.
   * @param {any} event - any - The event object that is passed to the function.
   */
  inputHandlePancard(event: any) {
    var number = event.target.value;
    if (number.length == 10) {
      this.registrationService.verifyPan(
        this.registrationForm.get('pancard')?.value).subscribe((res: any) => {
          console.log('pancard response', res);
          if (res && res.data && res.data.status == 'VALID') {
            this.registrationForm.patchValue({
              name: res.data.full_name
            })
          }
        });
    }
  }

  /**
   * It takes the form data from the form and call user creation api.
   */
  submitUserData() {
    let userFormContent = {
      organizationId: this.newlyCreatedOrganisationData?.id
    };
    for (const key of this.step2FormControlNames) {
      userFormContent = { ...userFormContent, [key]: this.registrationForm.value[key], }
    }
    this.registrationService.createUser(userFormContent).subscribe((response: any) => {
      if (response && response.id) {
        this.commonService.customToast('User created successfully');
        this.commonService.navigateToSpecificPage('organisation');
      }
    }, (error) => {
      console.log('error', error);
      this.commonService.customToast('Error');
    });
  }

  joinEvent() {
    this.joinEventEmitter.emit();
  }

  /**
   * It takes the values from the form, encrypts them, and Calling a service method called sendOtp() 
   * and passing the data to it.
   */
  sendOtp() {
    let password = this.registrationForm.value.password;
    let confirmPassword = this.registrationForm.value.confirmPassword;
    let encryptedPassword = this.commonService.getSecretKey(environment?.secretKey, password);
    let encryptedConfirmPassword = this.commonService.getSecretKey(environment?.secretKey, confirmPassword);
    let data = {
      "firstName": this.registrationForm.value.firstName,
      "contactNo": this.registrationForm.value.contactNo,
      "emailId": this.registrationForm.value.emailId,
      "ngoProfileId": this.registrationForm.value.ngoProfileId,
      "designationId": parseInt(this.registrationForm.value.designationId),
      "password": encryptedPassword,
      "confirmPassword": encryptedConfirmPassword
    }

    this.registrationService.sendOtp(data).subscribe((res: any) => {
      this.openOtpVerificationDialog();
      this.otpTxnId = res['data'].otpTxnId;
    }, (error) => {
      console.log('error', error);
    })
  }

  getCaptchaValue(data: any) {
    console.log(data);
    this.recaptcha = data;
    // this.registrationForm.controls['recaptcha'].patchValue(data);
    console.log('form', this.registrationForm)
  }

  onFocusEvent(inputFieldIdId: string) {
    this.commonService.onFocusEvent(inputFieldIdId);
  }

  ngOnDestroy(): void {
    this.commonService.showFooter.next(true);
    this.commonService.showTopBar.next(true);
  }

}
