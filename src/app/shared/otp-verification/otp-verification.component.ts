import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  otp: string = '';
  // showOtpComponent = true;
  formType='default'
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  constructor(
    public dialogRef: MatDialogRef<OtpVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formType = this.data.formType ? this.data.formType : 'default',
    console.log('data===>', this.data);
    console.log('formData', this.data.formData)
  }
  countDown: Subscription | undefined;
  counter = 120;
  tick = 1000;
  isDisabled= true;
  ngOnInit() {
    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        // console.log(this.counter);
        if (this.counter == 0) {
          this.isDisabled= false;
          this.countDown?.unsubscribe();
        }
      });
  }
  // ngOnDestroy() {
  //   this.countDown = null;
  // }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  closeDialog() {
    this.dialogRef.close({eventType:'close'});
  }

  closeDialogWithData(event: any) {
    this.dialogRef.close({eventType:'submit',otp:this.otp})
  }

  submitUserData() {
    this.dialogRef.close({eventType:'submit',otp:this.otp})
  }

  resendOTP() {
    this.counter = 120;
    this.isDisabled = true
    this.dialogRef.close({eventType:'resendOtp',otp:""});

  }
}
