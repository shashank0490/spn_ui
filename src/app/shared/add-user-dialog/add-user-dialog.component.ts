import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { countryCodeJson } from '../Constants/countrycode';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  designations=[];
  countryCodes = countryCodeJson
  constructor(
    private fb: FormBuilder,
    private registrationService:RegistrationService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getDesignation()
  }
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    designationId: ['',Validators.required],
    emailId: ['', [Validators.required,Validators.pattern('[A-Za-z0-9._-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
    contactNo: this.fb.group({
      countryCode: ['+91'],
      number: ['',Validators.required]
    })
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

closeDialog() {
  this.dialogRef.close({eventType:'close'});
}

closeDialogWithData(event: any) {
  this.dialogRef.close({eventType:'submit',data:this.profileForm.value})
}


}
