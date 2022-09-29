import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
  organisationList: any = [];
  constructor(
    private organisationService: RegistrationService,
    private commonService: CommonFunctionService
    ) { }


  ngOnInit(): void {
    this.getOrganisation();
  }

  getOrganisation() {
    this.organisationService.getAllOrganisation().subscribe((response: any) => {
      console.log('table-response', response)
      if (response && response.data) {
        this.commonService.customToast('Organisations data found successfully');
        this.organisationList = response.data;
        console.log('organisationList', this.organisationList) 
      }
    }, (error) => {
      console.log('error', error);
      this.commonService.customToast('Error');
    });
  }

}
