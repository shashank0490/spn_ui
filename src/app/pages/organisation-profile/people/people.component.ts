import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  odd :boolean = false;
  people =[
    {image:"contact-profile", peopleHeading:"Hazal Ozturk",
    peopleSubheading:"CEO & Co-Founder", peopleEmail:"hazal@nggo.com"
   ,peoplePhone:"+918781231299"},
   {image:"contact-profile", peopleHeading:"Hazal Ozturk",
    peopleSubheading:"CEO & Co-Founder", peopleEmail:"hazal@nggo.com"
   ,peoplePhone:"+918781231299"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
