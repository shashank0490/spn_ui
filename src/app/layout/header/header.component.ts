import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { CommonFunctionService } from '../../services/common-function/common-function.service';
import { LandingPageService } from '../../services/landing-page/landing-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  allData: any;
  navbarMenuList: any = [];
  selectedSlug: string = '';
  isTokenAvailable: boolean = false;
  showTopbar = true;
  navbarMenuToggle: boolean = false;
  loginData:any;
  imageFile:any;
  constructor(
    private commonService: CommonFunctionService,
    private landingPageService: LandingPageService,
    private registrationService: RegistrationService,
    public router: Router,
    public toastService:ToasterService
  ) {
    this.commonService.showFooter.subscribe((res) => {
      this.showTopbar = res;
    });
    this.commonService.showTopBar.subscribe((res) => {
      this.showTopbar = res;
    });
    // this.getPages();
  }

  ngOnInit(): void {
    this.commonService.loginDataUpdate.subscribe(res=>{
      if(res){
        this.loginData = JSON.parse(sessionStorage.getItem('loginData')??'');
      }
    })
    console.log('navbarMenuList from navbar com', this.navbarMenuList);
    this.commonService.isTokenAvailable.subscribe((response: any) => {
      this.isTokenAvailable = response;
      this.loginData = sessionStorage.length? JSON.parse(sessionStorage.getItem('loginData')??'') : ''
    });

    this.isTokenAvailable = sessionStorage.getItem('token') ? true : false;
  }

  getPages() {
    this.landingPageService.getNavbarMenuList().subscribe(
      (res: any) => {
        console.log(res);
        this.allData = res;
        this.prepareNavbarMenuList();
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  prepareNavbarMenuList() {
    // let navbarMenuList = this.allData?.data?.attributes?.pages?.data;
    let navbarMenuList = this.allData?.data?.attributes?.pages?.data.map(
      (menu: any) => {
        return {
          title: menu.attributes.title,
          slug: menu.attributes.slug,
          order: menu.attributes.order,
        };
      }
    );
    this.navbarMenuList = this.commonService.sortDataSource(
      navbarMenuList,
      'order'
    );
    console.log('navbarMenuList', this.navbarMenuList);
    this.getSelectedNavbarContent();
  }

  getSelectedNavbarContent() {
    const slugName = this.commonService.getSelectedRoute();
    console.log('slugName', slugName);
    this.landingPageService.getSelectedNavbarContent(slugName).subscribe(
      (response: any) => {
        console.log('getSelectedNavbarContent', response);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  navigateToSpecificPage(route: any) {
    // this.selectedSlug = route;
    this.commonService.navigateToSpecificPage(route);
  }

  logoutUser() {
    this.registrationService
      .logOut({lat: '', lng: ''})
      .subscribe((res) => {
        this.commonService.isTokenAvailable.next(false);
        sessionStorage.clear();
        this.toastService.showNotification('success','User Logged out Successfully')
        this.commonService.navigateToSpecificPage('home');
      });
  }

  isToggle() {
    this.navbarMenuToggle = !this.navbarMenuToggle;
  }
}
