import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-join',
  templateUrl: './event-join.component.html',
  styleUrls: ['./event-join.component.scss']
})
export class EventJoinComponent implements OnInit {
  eventForm! :FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeEventForm();
  }

  initializeEventForm(){
    this.eventForm = this.fb.group({
      legalEntity: '',
      annualBudget: '',
      stateWorked: '',
      designationPerson: '',
      select: ''

    })
  }

  submitForm() {
    console.log(this.eventForm.value);
  }

}
