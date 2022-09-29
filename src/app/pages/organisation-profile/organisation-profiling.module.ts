import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeopleComponent } from './people/people.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { ContactSocialComponent } from './contact-social/contact-social.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { AboutComponent } from './about/about.component';
import { OrganisationProfileComponent } from './organisation-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { OrgLevel1Component } from './org-level1/org-level1.component';
import { OrgLevel2Component } from './org-level2/org-level2.component';
import { OrgLevel0Component } from './org-level0/org-level0.component';

export const orgProfilingRoutes: Routes = [
  { path: "", redirectTo: "profiling", pathMatch: 'full' },
  { path: "profiling",
    component: OrganisationProfileComponent,
    children:[
      {path: "about", component: AboutComponent},
      {path: "people", component: PeopleComponent},
      {path: "compliance", component: ComplianceComponent},
      {path: "documentation", component: DocumentationComponent},
      {path: "contact", component: ContactSocialComponent},
      
    ]
  },
  {path: "org-level-0", component: OrgLevel0Component},
      {path: "org-level-1", component: OrgLevel1Component},
      {path: "org-level-2", component: OrgLevel2Component}
  // { path: "about", component: AboutComponent },
  // { path: "people", component: PeopleComponent },
  // { path: "compliance", component: ComplianceComponent },
  // { path: "documentation", component: DocumentationComponent },
  // { path: "contact", component: ContactSocialComponent },
]


@NgModule({
  declarations: [
    OrganisationProfileComponent,
    PeopleComponent,
    ComplianceComponent,
    ContactSocialComponent,
    DocumentationComponent,
    AboutComponent,
    OrgLevel0Component,
    OrgLevel1Component,
    OrgLevel2Component
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(orgProfilingRoutes)
  ]
})
export class OrganisationProfilingModule { }
