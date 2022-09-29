import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(private commonService:CommonFunctionService) { }

  ngOnInit(): void {
    this.commonService.showFooter.next(false);
    this.commonService.showTopBar.next(false);
  }

  ngOnDestroy(): void {
    this.commonService.showFooter.next(true);
    this.commonService.showTopBar.next(true);
  }
}
