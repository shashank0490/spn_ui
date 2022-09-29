import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit {

  constructor() { }
  userNotificationJson = [
    {label :'Subscribe to all notifications' , whatsapp:false , email:false},
    {label :'Organizational profile updates' , whatsapp:false , email:false},
    {label :'Addition of new funding opportunity' , whatsapp:false , email:false},
    {label :'Shortlisting of parent organization for funding opportunity' , whatsapp:false , email:false},
    {label :'Change in status of application for funding opportunity' , whatsapp:false , email:false},
    {label :'Availability of new relevant research articles' , whatsapp:false , email:false},
    {label :'Availability of new resources/tools' , whatsapp:false , email:false},
    {label :'Upcoming events' , whatsapp:false , email:false},
    {label :'Event updates and availability of follow up documents' , whatsapp:false , email:false},
  ]
  ngOnInit(): void {
    console.log(this.userNotificationJson)
  }
  toggleNotifications(event:Event){
    console.log(event,this.userNotificationJson)
  }
}
