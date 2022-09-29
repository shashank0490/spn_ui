import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonFunctionService } from '../../services/common-function/common-function.service';
import { RegistrationService } from "../../services/registration/registration.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  submitted: boolean = false;
  show: boolean = false;
  constructor(private fb: FormBuilder,
    private registrationService: RegistrationService,
    private commonService: CommonFunctionService,
    private activatedRoute : ActivatedRoute,
  ) {
    if(!!sessionStorage.getItem('token')){
      this.commonService.navigateToSpecificPage('/ngo-landing')
      return
    }
  }


  ngOnInit(): void {
    this.commonService.showFooter.next(false);
    this.commonService.showTopBar.next(false);
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      password: ['', Validators.required]
    })
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  submitForm(){
    console.log('submitForm', this.loginForm.value);
    if(this.loginForm.invalid) {
      this.submitted = true;
      return
    }

    const loginFormValue = this.loginForm.value;
    this.registrationService.login(loginFormValue).subscribe((response: any) => {
      console.log('response', response)
      if (response && response.jwt) {
        sessionStorage.setItem('token', response.jwt);
        this.commonService.isTokenAvailable.next(true);
        this.commonService.navigateToSpecificPage('organisation');
      }
    }, (error) => {
      console.log('error', error);
    });
  }

  showPassword(){
    this.show = !this.show
  }

  login() {
    let loginData = {
      emailId: this.loginForm.value.emailId,
      password: this.loginForm.value.password,
      random: '',
    };
    const random = Math.random();
    let password = this.loginForm.value.password
    let ciphertext = this.commonService.getSecretKey(environment.secretKey, password)
    let randomKey = random.toString()
    let encryptCiphertextRandom = this.commonService.getSecretKey(randomKey, ciphertext)
    loginData = {
      emailId: this.loginForm.value.emailId,
      password: encryptCiphertextRandom,
      random: randomKey,
    };
    this.registrationService.login(loginData).subscribe((res: any) => {
      if(res && res.data){
        sessionStorage.setItem('loginData', JSON.stringify(res.data));
        sessionStorage.setItem('token', res['token'])
        this.commonService.navigateToSpecificPage('ngo-landing');
        this.commonService.isTokenAvailable.next(true)
      }

    })
  }

  ngOnDestroy(): void {
    this.commonService.showFooter.next(true);
    this.commonService.showTopBar.next(true);
  }

}
