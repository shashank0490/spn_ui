import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { OtpVerificationComponent } from 'src/app/shared/otp-verification/otp-verification.component';
import { MustMatch } from 'src/app/shared/Validators/MustMatch';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  step = 1;
  confirmPasswordForm!: FormGroup;
  show = false;
  shows: boolean = false;
  step2FormControlNames = ['newPassword', 'confirmPassword'];
  otpData: any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastService: ToasterService,
    private registrationService: RegistrationService,
    private commonService: CommonFunctionService
  ) {}

  emailId = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '[A-Za-z0-9._-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'
    ),
  ]);
  ngOnInit(): void {
    this.commonService.showFooter.next(false);
    this.commonService.showTopBar.next(false);
    this.intializeConfirmPasswordForm();
  }
  reset() {
    this.registrationService
      .forgotPassword({ emailId: this.emailId.value })
      .subscribe((res: any) => {
        this.otpData = res['data'];
        this.openOtpVerificationDialog(this.otpData);
      });
  }

  openOtpVerificationDialog(otpData: any) {
    console.log('called');
    const dialogRef = this.dialog.open(OtpVerificationComponent, {
      width: '400px',
      data: { formData:{emailId: this.emailId.value}, showEmail:true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (!result) return;
      if (result.eventType == 'submit') {
        this.otpData['otp'] = result.otp;
        this.sendOtp(otpData);
      }
      if (result.eventType == 'resendOtp') {
        // this.step--;
        this.reset();
      }
    });
  }

  sendOtp(otpData: any) {
    this.registrationService.otpVerify(otpData).subscribe(
      (res: any) => {
        this.step++;
        for (const controlName of this.step2FormControlNames) {
          this.setValidators(controlName);
        }
      },
      (error) => {
        if (error.error.message == 'Invalid OTP!') {
          this.openOtpVerificationDialog(this.otpData);
        }
      }
    );
  }

  intializeConfirmPasswordForm() {
    this.confirmPasswordForm = this.fb.group(
      {
        newPassword: ['', Validators.minLength(8)],
        confirmPassword: ['', Validators.minLength(8)],
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    );
  }

  setValidators(controlName: string) {
    this.confirmPasswordForm.controls[controlName].setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@%^&*-]).{8,}$')
    ]);
    this.confirmPasswordForm.controls[controlName].updateValueAndValidity;
  }

  showPassword() {
    this.show = !this.show;
  }

  showRenterPassword() {
    this.shows = !this.shows;
  }

  get confirmPasswordFormControl() {
    return this.confirmPasswordForm.controls;
  }

  resetPassword() {
    let password = this.confirmPasswordForm.value.newPassword
    let confirmPassword = this.confirmPasswordForm.value.confirmPassword;
    let encryptedPassword = this.commonService.getSecretKey(environment?.secretKey, password)
    let encryptedConfirmPassword = this.commonService.getSecretKey(environment?.secretKey, confirmPassword);
    let bodyContent = {newPassword:encryptedPassword,confirmPassword:encryptedConfirmPassword, ...this.otpData, emailId :this.emailId.value};
    this.registrationService.resetPassword(bodyContent).subscribe((res: any) => {
      this.toastService.showNotification('success', res['message']);
      this.commonService.navigateToSpecificPage('reset-password-success');
    });
  }

  ngOnDestroy(): void {
    this.commonService.showFooter.next(true);
    this.commonService.showTopBar.next(true);
  }
}
