import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AddUserDialogComponent } from 'src/app/shared/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastService: ToasterService,
    private registrationService: RegistrationService,
    private commonService: CommonFunctionService,
  ) {

   }
  users:any=[];
  ngOnInit(): void {
    this.getInvitedUsers()
  }

  getInvitedUsers(){
    this.registrationService.getInvitedUsers().subscribe((res:any)=>{
      this.users = res['data'];
      console.log(this.users)
    })
  }
  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (!result) return
      if(result){
        this.createInvite(result.data);
      }
    });
  }

createInvite(data:any){
  this.registrationService.sendInvite(data).subscribe((res:any)=>{
    if(res && res['success']){
      this.toastService.showNotification('success',res.message)
      this.getInvitedUsers();
    }
  })
}


}
