import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private router: Router,private route:ActivatedRoute) { }
  menuList = [
    {
      label:'Dashboard',
      route:'dashboard',
    },
    {
      label:'Web Pages',
      route:'webpages',
      children:[
       {
        label:'Landing Page',
        route:'landing-page',
       },
       {
        label:'User Home Page',
        route:'user-home-page',
       },
       {
        label:'About Us Page',
        route:'about-us-page',
       },
       {
        label:'Funding Page',
        route:'funding-page',
       }
      ]
    },
    {
      label:'NGOs',
      route:'ngos',
    },
    {
      label:'Funding',
      route:'fundings',
    },
    {
      label:'Events',
      route:'events',
    },
    {
      label:'More Services',
      route:'more-services',
      children:[
       {
        label:'Landing Page',
        route:'landing-page',
       },
       {
        label:'User Home Page',
        route:'user-home-page',
       },
       {
        label:'About Us Page',
        route:'about-us-page',
       },
       {
        label:'Funding Page',
        route:'funding-page',
       }
      ]
    },
    {
      label:'resources',
      route:'resources',
    },
    {
      label:"What's new",
      route:'whats-new',
    },

  ]
  ngOnInit(): void {
  }
  changeTab(event:any){
    this.router.navigate([event.route], { relativeTo: this.route });


  }
}
