import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RegistrationComponent } from './registration.component';
import { MockModule } from 'ng-mocks';
import { RegistrationService } from "../../services/registration/registration.service";
import { CommonFunctionService } from '../../services/common-function/common-function.service';
import { environment } from '../../../environments/environment';

const dummyCaptcha = '03AIIukzggAxUQSceVpaw2eE5bwe6AVymvkp6lrUqh2pb-W7JANYJP3qKMY8BjzbBOPi8pklZRmcxjz67HtBfb4oRaSdA1Yr8tJG1b8S-wFk6KspJDcoZgl_h0ulytuDj2vKa8QBHHM09egz6N4mVas8rvFoRqdlclBddJXyWTcz_y16nDP_S_7Ck-WjHFGBU_ov-eS0QLAWOIp_zxUFnQakj-GPa1N2oEeOeeWPPr1hjuXbSAD21PUFYrWxisY_pBXzPTz8UOfPzWg6oaj5UXt-7MxTBETkTQ9y6eQ9ATMpQEPHs4m36s7wzjyxEP9dlcVU7s0M8SnNfUQLZ8M8mN4JmqphNh0KwqZBMTplMcaiG-aKiZdyLorQMvQIAGVFYzB1GNI_C0NrXF--soZnz3wJ5H2I0dUNc0rT3eV3-FD41Z18vBQpbwWsy0YqKBqeYVkL74j3zWaXS68t87j7ME2iZElkYWqTJEUrtxNhul3zROrdiCeYgQdqmXjKqCotJ3u9dO_loHHquX';
// mock TestConstants:
const TestConstants = { validCaptcha: 'valid' };
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registrationService: RegistrationService;
  let commonFunctionService: CommonFunctionService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [MockModule(NgxCaptchaModule), ReactiveFormsModule, MatDialogModule, HttpClientModule, RouterModule.forRoot([]), MatSnackBarModule ],
      providers: [ RegistrationService, CommonFunctionService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.registrationForm.controls["recaptcha"].setValue(TestConstants.validCaptcha); //manually set a string data as input data.
    registrationService = TestBed.get(RegistrationService);
    commonFunctionService = TestBed.get(CommonFunctionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should init component properly", function () {
    component.ngOnInit();
    expect(component.registrationForm).toBeDefined();
  });

  it('Registration Form - Pancard Number Check', () => {
    let pancard: any = component.registrationForm.controls['pancard'];
    expect(pancard.valid).toBeFalsy();
    expect(pancard.errors['required']).toBeTruthy();
  });

  it('Registration Form - Set Pancard', () => {
    let pancard: any = component.registrationForm.controls['pancard'];
    pancard.setValue('FWTSS8348H');
    expect(pancard.valid).toBeTruthy();
    expect(pancard.value).toEqual('FWTSS8348H');
  });

  it('Registration Form - Check Pancard existence in Database', (done) => {
    let pancard: any = component.registrationForm.controls['pancard'];
    pancard.setValue('FWRPS8990H');
    const success: boolean = false;
    registrationService.getOrganisationByPan('FWRPS8991H').subscribe((res: any) => {
      if (res.data.length) {
        fixture.detectChanges();
        expect(res.data.length).toBe(1);
        const { id, name, website } = res['data']
        component.registrationForm.patchValue({ ...res['data'][0], ngoProfileId: id });
        done();
      } else {
        fixture.detectChanges();
        expect(success).toBeFalsy();
        component.registrationForm.controls['name'].enable();
        component.registrationForm.controls['website'].enable();
        component.registrationForm.controls['name'].patchValue('')
        component.registrationForm.controls['website'].patchValue('')
        done();
      }
    })
  });

  it('Registration Form - Org name Check', () => {
    let name: any = component.registrationForm.controls['name'];
    expect(name.valid).toBeFalsy();
    expect(name.errors['required']).toBeTruthy();
  });

  it('Registration Form - Set Org name', () => {
    let name: any = component.registrationForm.controls['name'];
    name.setValue('New NGO 2');
    expect(name.valid).toBeTruthy();
    expect(name.value).toEqual('New NGO 2');
  });

  it('Registration Form - website Check', () => {
    let website: any = component.registrationForm.controls['website'];
    expect(website.valid).toBeTruthy();
    // expect(website.errors['required']).toBeTruthy();
    // expect(website.errors.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')).toBeTruthy();
  });

  it('Registration Form - Set website', () => {
    let website: any = component.registrationForm.controls['website'];
    website.setValue('www.login.yahoo.com');
    expect(website.valid).toBeTruthy();
    // expect(website.value).toEqual('www.login.yahoo.com');
    expect(website.errors).toBeNull();
  });

  it('Registration Form - aboutInn Check', () => {
    let aboutInn: any = component.registrationForm.controls['aboutInn'];
    expect(aboutInn.valid).toBeFalsy();
  });

  it('Registration Form - Set aboutInn', () => {
    let aboutInn: any = component.registrationForm.controls['aboutInn'];
    aboutInn.setValue('Word of Mouth');
    expect(aboutInn.valid).toBeTruthy();
    expect(aboutInn.value).toEqual('Word of Mouth');
  });

  it('Registration Form - Step 1 Form Submitted', () => {
    expect(component.registrationForm.invalid).toBeTruthy();
    // let btn = fixture.debugElement.query(By.css('input[type=submit]'));

    component.registrationForm.controls['pancard'].setValue('FWRUS8997H');
    component.registrationForm.controls['name'].setValue('New Test NGO');
    component.registrationForm.controls['website'].setValue('www.google.com');
    component.registrationForm.controls['aboutInn'].setValue('Word of Mouth');
    component.registrationForm.controls['recaptcha'].setValue(dummyCaptcha);

    const orgContent: any = {
      pancard: component.registrationForm.value.pancard,
      name: component.registrationForm.value.name,
      website: component.registrationForm.value.website,
      aboutInn: component.registrationForm.value.aboutInn
    };
    if (window.location.hostname !== 'localhost') {
      orgContent['recaptcha'] = component.registrationForm.value.recaptcha
    }
    if (!orgContent?.website) {
      delete orgContent?.website
    }
    registrationService.createOrganisation(orgContent).subscribe((response: any) => {
      if (response.success) {
        expect(response.success).toBeTruthy();
        fixture.detectChanges();
        component.orgSuccessCode = response.code;
        component.newlyCreatedOrganisationData = response.data;
        console.log('orgSuccessCode', component.orgSuccessCode)
        component.newlyCreatedOrganisationData['recaptcha'] = component.registrationForm.value.recaptcha;
        component.registrationForm.patchValue({ ngoProfileId: component.newlyCreatedOrganisationData.id, ...component.newlyCreatedOrganisationData })
        console.log('registrationForm', component.registrationForm)
        component.initializeStep2Form();
      }
    }, (error) => {
      console.log('error', error);
      fixture.detectChanges();
      expect(error.err.success).toBeFalsy();
    });

    // component.next();

    // component.registrationForm.controls['pancard'].setValue('FWRUS8997H');
    // component.registrationForm.controls['name'].setValue('New Test NGO');
    // component.registrationForm.controls['website'].setValue('www.google.com');
    // component.registrationForm.controls['aboutInn'].setValue('Word of Mouth');
    // component.registrationForm.controls['recaptcha'].setValue(TestConstants.validCaptcha);

    // component.createOrganisation();
    // fixture.detectChanges();
    // setTimeout(() => {
    //   expect(component.orgSuccessCode).toEqual('SUCCESS');
    // }, 5000)

  })

  it('Registration Form - firstName Check', () => {
    let firstName: any = component.registrationForm.controls['firstName'];
    expect(firstName.valid).toBeTruthy();
  });

  it('Registration Form - Set firstName', () => {
    let firstName: any = component.registrationForm.controls['firstName'];
    firstName.setValue('Mohan');
    expect(firstName.valid).toBeTruthy();
    expect(firstName.value).toEqual('Mohan');
  });

  // it('Registration Form - contactNo Check', () => {
  //   let contactNo: any = component.registrationForm.controls['contactNo'];
  //   expect(contactNo.valid).toBeTruthy();
  // });

  // it('Registration Form - Set contactNo', () => {
  //   let contactNo: any = component.registrationForm.controls['contactNo'];
  //   contactNo.setValue('8765165458');
  //   expect(contactNo.valid).toBeTruthy();
  //   expect(contactNo.value).toEqual('8765165458');
  // });

  it('Registration Form - emailId Check', () => {
    let emailId: any = component.registrationForm.controls['emailId'];
    expect(emailId.valid).toBeTruthy();
  });

  it('Registration Form - Set emailId', () => {
    let emailId: any = component.registrationForm.controls['emailId'];
    emailId.setValue('kartik@dhwaniris.com');
    expect(emailId.valid).toBeTruthy();
    expect(emailId.value).toEqual('kartik@dhwaniris.com');
  });

  it('Registration Form - ngoProfileId Check', () => {
    let ngoProfileId: any = component.registrationForm.controls['ngoProfileId'];
    expect(ngoProfileId.valid).toBeTruthy();
  });

  it('Registration Form - Set ngoProfileId', () => {
    let ngoProfileId: any = component.registrationForm.controls['ngoProfileId'];
    ngoProfileId.setValue('9999');
    expect(ngoProfileId.valid).toBeTruthy();
    expect(ngoProfileId.value).toEqual('9999');
  });

  it('Registration Form - designationId Check', () => {
    let designationId: any = component.registrationForm.controls['designationId'];
    expect(designationId.valid).toBeTruthy();
  });

  it('Registration Form - Set designationId', () => {
    let designationId: any = component.registrationForm.controls['designationId'];
    designationId.setValue('Project Manager');
    expect(designationId.valid).toBeTruthy();
    expect(designationId.value).toEqual('Project Manager');
  });

  it('Registration Form - password Check', () => {
    let password: any = component.registrationForm.controls['password'];
    expect(password.valid).toBeTruthy();
  });

  it('Registration Form - Set password', () => {
    let password: any = component.registrationForm.controls['password'];
    password.setValue('Password@12');
    let encryptedPassword = commonFunctionService.getSecretKey(environment?.secretKey, password);
    expect(password.valid).toBeTruthy();
    expect(encryptedPassword).toEqual(commonFunctionService.getSecretKey(environment?.secretKey, password));
  });

  it('Registration Form - confirmPassword Check', () => {
    let confirmPassword: any = component.registrationForm.controls['confirmPassword'];
    expect(confirmPassword.valid).toBeTruthy();
  });

  it('Registration Form - Set confirmPassword', () => {
    let confirmPassword: any = component.registrationForm.controls['confirmPassword'];
    confirmPassword.setValue('Password@12');
    // expect(confirmPassword.valid).toBeTruthy();
    let encryptedConfirmPassword = commonFunctionService.getSecretKey(environment?.secretKey, confirmPassword);
    expect(encryptedConfirmPassword).toEqual(commonFunctionService.getSecretKey(environment?.secretKey, confirmPassword));
  });

  it('Registration Form - Step 2 Form Submitted - User Creation', () => {
    expect(component.registrationForm.invalid).toBeTruthy();
    // let btn = fixture.debugElement.query(By.css('input[type=submit]'));

    component.registrationForm.controls['firstName'].setValue('Anup');
    component.registrationForm.controls['emailId'].setValue('vivek.kumar@dhwaniris.com');
    component.registrationForm.controls['ngoProfileId'].setValue('999');
    component.registrationForm.controls['designationId'].setValue('Project Manager');

    let password = component.registrationForm.value.password;
    let confirmPassword = component.registrationForm.value.confirmPassword;
    let encryptedPassword = commonFunctionService.getSecretKey(environment?.secretKey, password);
    let encryptedConfirmPassword = commonFunctionService.getSecretKey(environment?.secretKey, confirmPassword);
    let data = {
      "firstName": component.registrationForm.value.firstName,
      "contactNo": component.registrationForm.value.contactNo,
      "emailId": component.registrationForm.value.emailId,
      "ngoProfileId": component.registrationForm.value.ngoProfileId,
      "designationId": parseInt(component.registrationForm.value.designationId),
      "password": encryptedPassword,
      "confirmPassword": encryptedConfirmPassword,
    }

    registrationService.sendOtp(data).subscribe((res: any) => {
      component.openOtpVerificationDialog();
      component.otpTxnId = res['data'].otpTxnId;
    }, (error) => {
      console.log('error', error);
    })
  });

});
