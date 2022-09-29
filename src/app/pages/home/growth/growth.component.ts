import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.scss'],
})
export class GrowthComponent implements OnInit {
  @Input() data: any;
  constructor() {}
  carouselItems = [];
  ngOnInit(): void {
    if (this.data) {
      this.carouselItems = this.data[0].attributes;
    }
    console.log('GrowthComponent', this.data);
  }
}
