import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page/landing-page.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  @Input() data: any;

  eventList: any = [
    {
      data: [
        {
          title: 'Join the movement of creating a irrigation system',
          date: '12-07-2-22',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',
          description: 'adsasdasdasdasdasdas',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
        {
          title: 'Funding Round from Philatrophist around the w...',
          date: '06 Jul',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',
          description: 'ssssssss',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIwZGVsaGklMjBpbmRpYXxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        {
          title: 'Join the movement of creating a irrigation system',
          date: '12-07-2-22',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',

          description: 'adsasdasdasdasdasdas',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
      ],
    },
    {
      data: [
        {
          title: 'Join the movement of creating a irrigation system',
          date: '12-07-2-22',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',
          description: 'adsasdasdasdasdasdas',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
        {
          title: 'Funding Round from Philatrophist around the w...',
          date: '06 Jul',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',
          description: 'ssssssss',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIwZGVsaGklMjBpbmRpYXxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        {
          title: 'Join the movement of creating a irrigation system',
          date: '12-07-2-22',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',

          description: 'adsasdasdasdasdasdas',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
      ],
    },
    {
      data: [
        {
          title: 'Join the movement of creating a irrigation system',
          date: '12-07-2-22',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',
          description: 'adsasdasdasdasdasdas',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
        {
          title: 'Funding Round from Philatrophist around the w...',
          date: '06 Jul',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',
          description: 'ssssssss',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIwZGVsaGklMjBpbmRpYXxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        {
          title: 'Join the movement of creating a irrigation system',
          date: '12-07-2-22',
          eventType: 'Farming',
          address:
            'B-154, Street Number 9, Mayur Vihar Phase II, Vinod Nagar East, New Delhi',

          description: 'adsasdasdasdasdasdas',
          buttonName: 'Register Now',
          isBtnVisible: true,
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
      ],
    },
  ];

  viewMode: string = 'grid';
  constructor(private landingPage: LandingPageService, private router: Router) {
    router.url.includes('event') ? this.getTemplates() : '';
  }

  ngOnInit(): void {
    console.log('EventsComponent', this.data);
  }
  getTemplates() {
    this.data = this.landingPage
      .getSelectedNavbarContent('event')
      .subscribe((res: any) => {
        console.log();
      });
  }
}
