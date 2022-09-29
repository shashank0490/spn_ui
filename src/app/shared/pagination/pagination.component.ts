import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() index:number = 1;
  @Input() totalCount:number = 0;
  @Input() skipCount:number = 0;
  @Input() limitCount:number = 0;

  @Output()
  page: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  navigateToPage(page:number){
    
  }

}
