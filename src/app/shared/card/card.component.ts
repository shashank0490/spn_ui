import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  // @Input() viewMode: 'grid' | 'list' = 'grid';
  @Input() viewMode: string = 'grid';

  @Input() data: any;
  constructor() {}

  ngOnInit(): void {}
}
