import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showFooter = true;
  constructor(public commonService :CommonFunctionService ) { }

  ngOnInit(): void {
  this.commonService.showFooter.subscribe(res=>{
    this.showFooter = res;
  })
  }

}
