import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePasswordResetComponent } from './profile-password-reset/profile-password-reset.component';
import { ForgotPasswordComponent } from '../home/forgot-password/forgot-password.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component:MyProfileComponent
  },
  {
    path: 'personal-details',
    component:PersonalDetailsComponent
  },
  {
    path: 'reset-password',
    component:ProfilePasswordResetComponent
  },
  {
    path: 'user-notifications',
    component:UserNotificationsComponent
  },
  {
    path: 'manage-users',
    component:ManageUsersComponent
  },
];

@NgModule({
  declarations: [MyProfileComponent, PersonalDetailsComponent,ProfilePasswordResetComponent, UserNotificationsComponent, ManageUsersComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule

  ]
})
export class UserProfileModule { 
  constructor(private commonService:CommonFunctionService){
    this.commonService.showFooter.next(false)
    this.commonService.showTopBar.next(false)
  }
}
