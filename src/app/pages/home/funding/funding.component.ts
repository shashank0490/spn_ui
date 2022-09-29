import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page/landing-page.service';

@Component({
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.scss']
})
export class FundingComponent implements OnInit {
  @Input() data: any;

  constructor(private landingPage:LandingPageService,private router: Router) {
    // router.url.includes('funding')?this.getTemplates():''
   }

  ngOnInit(): void {
  }
  getTemplates() {
    this.data = this.landingPage.getSelectedNavbarContent('funding').subscribe((res: any) => {
      console.log()
    })}

}
