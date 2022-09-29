import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
 @Input() menuList :any;
 @Output() changeTab = new EventEmitter()
  constructor() { }
  changeMenuTab(item:any){
    this.changeTab.emit(item)
  }
  ngOnInit(): void {
  }

}
