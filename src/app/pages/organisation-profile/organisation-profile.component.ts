import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-organisation-profile',
  templateUrl: './organisation-profile.component.html',
  styleUrls: ['./organisation-profile.component.scss']
})
export class OrganisationProfileComponent implements OnInit {

  benefits = [{"image":"cardImg", "heading":"Working with Fundraisers to provide you funds"},
              {"image":"cardImg", "heading":"Working with Fundraisers to provide you funds"}]
  

  tabList = [{"tabName": "About", routeName: "about"},
  {"tabName": "People", routeName: "people"},
  {"tabName": "Compliance", routeName: "compliance"},
  {"tabName": "Documentation", routeName: "documentation"},
  {"tabName": "Contact", routeName: "contact"}
  ];
  constructor(public router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  activateChildRoute(routeName: string){
    this.router.navigate([routeName], {relativeTo: this.activatedRoute});
  }

}
