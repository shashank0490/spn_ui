import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EventJoinComponent } from '../event-join/event-join.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  
images = [{"img":"https://cdn.pixabay.com/photo/2022/08/01/12/24/people-7358064_1280.jpg"}
  ]
formMode:string = 'normal';
mode:string = 'grid';
eventsList = [
  {
    title: 'Join the movement of creating a irrigation system',
    date: '12-07-2-22',
    eventType: 'Farming',
    address:
      'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',
    description: 'adsasdasdasdasdasdas',
    buttonName: 'Participate',
    isBtnVisible: true,
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  },
  {
    title: 'Join the movement of creating a irrigation system',
    date: '12-07-2-22',
    eventType: 'Farming',
    address: 'sdadasdasdasdadas',
    description: 'adsasdasdasdasdasdas',
    buttonName: 'Participate',
    isBtnVisible: true,
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  },
  {
    title: 'Join the movement of creating a irrigation system',
    date: '12-07-2-22',
    eventType: 'Farming',
    address: 'sdadasdasdasdadas',
    description: 'adsasdasdasdasdasdas',
    buttonName: 'Participate',
    isBtnVisible: true,
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  },
]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    const dialogRef = this.dialog.open(EventJoinComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
