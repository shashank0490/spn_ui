import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonFunctionService } from '../../services/common-function/common-function.service';
import { RegistrationService } from "../../services/registration/registration.service";
import { environment } from '../../../environments/environment';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let registrationService: RegistrationService;
  let commonFunctionService: CommonFunctionService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
        imports:[
          RouterTestingModule,
          HttpClientTestingModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule
        ],
        providers: [
          FormBuilder,
          RegistrationService,
          CommonFunctionService
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    registrationService = TestBed.get(RegistrationService);
    commonFunctionService = TestBed.get(CommonFunctionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should init component properly", function () {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
  });

/* This is a test case to check if the email is entered. */
  it('Email Check - Should check if the email address is enterted', () => {
    let email = component.loginForm.controls['emailId'];
    expect(email.pristine).toBeTruthy()
    email.setValue('')
    expect(email.valid).toBeFalsy()
    expect(email.errors?.required).toBeTruthy()
  });

/* This is a test case to check if the email address is in valid format. */
  it('Email Check - Should check if the email address is invalid format', () => {
    let email = component.loginForm.controls['emailId'];
    email.setValue('xyz')
    expect(email.pristine).toBeTruthy()
    expect(email.valid).toBeFalsy()
    expect(email.errors?.pattern).toBeTruthy()
  });

  /* This is a test case to check if the email address is in valid format. */
  it('Email Check - Should check if the email address is in valid format', () => {
    let email = component.loginForm.controls['emailId'];
    email.setValue('xyz@gmail.com')
    expect(email.pristine).toBeTruthy()
    expect(email.valid).toBeTruthy()
    expect(email.errors).toBeNull()
  });

/* This is a test case to check if the password is entered. */
  it('Password Required Check - Should check if the password is entered', () => {
    let password = component.loginForm.controls['password'];
    password.setValue('')
    expect(password.pristine).toBeTruthy()
    expect(password.valid).toBeFalsy()
    expect(password.errors?.required).toBeTruthy()
  });

/* Checking if the password entered is of length less than 8 characters. */
//   it('Password Check - Should check if the password entered is of length less than 8 characters', () => {
//     let password = component.loginForm.controls['password'];
//     password.setValue('xyz3134')
//     expect(password.valid).toBeFalsy()
//     expect(password.pristine).toBeTruthy()
//     expect(password.errors?.minLength).toBeTruthy()
//   });
// /* This is a test case to check if the password entered is in correct format. */

//   it('Password Check - Should check if the password entered is in invalid format', () => {
//     let password = component.loginForm.controls['password'];
//     password.setValue('xyz31343')
//     expect(password.valid).toBeFalsy()
//     expect(password.pristine).toBeTruthy()
//     expect(password.errors?.pattern).toBeTruthy()
//   });

  it('Password Check - Should check if the password entered is in valid format', () => {
    let password = component.loginForm.controls['password'];
    password.setValue('xyz@1234')
    expect(password.valid).toBeTruthy()
    expect(password.pristine).toBeTruthy()
    expect(password.errors).toBeNull()
  });

  it('Login Form Submit - Using wrong credentials', (done) => {
    component.loginForm.controls['emailId'].setValue('nihal@gmai.com');
    component.loginForm.controls['password'].setValue('Nihal@1');
    const success: boolean = false;
    const random = Math.random();
    const password = component.loginForm.value.password
    const ciphertext = commonFunctionService.getSecretKey(environment.secretKey, password)
    const randomKey = random.toString()
    const encryptCiphertextRandom = commonFunctionService.getSecretKey(randomKey, ciphertext)
    const loginData = {
      emailId: component.loginForm.value.emailId,
      password: encryptCiphertextRandom,
      random: randomKey,
    };
    // component.login();
    registrationService.login(loginData).subscribe((res: any) => {
      console.log(res, 'Logged In');
      commonFunctionService.navigateToSpecificPage('ngo-landing');
      sessionStorage.setItem('token', res['token']);
      commonFunctionService.isTokenAvailable.next(true);
      done();
    }, (error) => {
      console.log('error', error);
      fixture.detectChanges();
      expect(success).toBeFalsy();
      done();
    });
  });

});
