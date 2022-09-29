import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-ngo-landing-page',
  templateUrl: './ngo-landing-page.component.html',
  styleUrls: ['./ngo-landing-page.component.scss']
})
export class NgoLandingPageComponent implements OnInit,OnDestroy {

  constructor(private commonService:CommonFunctionService,private registrationService:RegistrationService) { 
    this.commonService.showTopBar.next(false);
  }
 

  ngOnInit(): void {
    // this.registrationService.getUser(sessionStorage.getItem('id')).subscribe((res:any)=>{
    //   sessionStorage.setItem('loginData',res['data'])
    // })
  }

  ngOnDestroy() {
    this.commonService.showTopBar.next(true);
  }
}
