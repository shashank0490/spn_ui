import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  mode: string = 'grid';
  enteredSerchValue:string = '';
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
    }
  ];

  filter = [
    {
      filterKey: 'Event Type',
      isChecked: true,
      subMenu: [
        { subFilterKey: 'Webinar', isChecked: true },
        { subFilterKey: 'Events', isChecked: true },
        { subFilterKey: 'Meetup', isChecked: false },
        { subFilterKey: 'Type', isChecked: false },
      ],
    },
    {
      filterKey: 'Sort by location',
      isChecked: true,
      subMenu: [
        { subFilterKey: 'Webinar', isChecked: true },
        { subFilterKey: 'Events', isChecked: true },
        { subFilterKey: 'Meetup', isChecked: false },
        { subFilterKey: 'Type', isChecked: false },
      ],
    },
    {
      filterKey: 'Sort by location',
      isChecked: true,
      subMenu: [
        { subFilterKey: 'Webinar', isChecked: true },
        { subFilterKey: 'Events', isChecked: true },
        { subFilterKey: 'Meetup', isChecked: false },
        { subFilterKey: 'Type', isChecked: false },
      ],
    },
  ];
  constructor(private router:Router,
    private route:ActivatedRoute) {}

  ngOnInit(): void {}

  switchTab(tab: string) {
    this.mode = tab;
  }
  onNaviagte(i:number){
    this.router.navigate(['event-details/'+i]);
  }
}
