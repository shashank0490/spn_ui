import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private commonService:CommonFunctionService) { }
  profileListJson = [
    {route:'personal-details',label:'Personal Details',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'},
    {route:'reset-password',label:'Reset Your Password',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'},
    {route:'user-notifications',label:'Notifications',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'},
    {route:'manage-users',label:'Manage NGO Users',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'}
  ]
  ngOnInit(): void {
  }

}
