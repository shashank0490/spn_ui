import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminFundingComponent } from './admin-funding/admin-funding.component';
import { AdminNgoComponent } from './admin-ngo/admin-ngo.component';
import { AdminResourcesComponent } from './admin-resources/admin-resources.component';
import { AdminWebpagesComponent } from './admin-webpages/admin-webpages.component';
import { AdminWhatsNewComponent } from './admin-whats-new/admin-whats-new.component';
import { AdminComponent } from './admin/admin.component';
import { MoreServicesComponent } from './more-services/more-services.component';

const routes: Routes = [
  {path:'',component:AdminComponent,

    children:[
      {path:'',component:AdminDashboardComponent},
      {path:'dashboard',component:AdminDashboardComponent},
      {path:'more-services',component:MoreServicesComponent},
      {path:'events',component:AdminEventsComponent},
      {path:'ngos',component:AdminNgoComponent},
      {path:'fundings',component:AdminFundingComponent},
      {path:'resources',component:AdminResourcesComponent},
      {path:'webpages',component:AdminWebpagesComponent},
      {path:'whats-new',component:AdminWhatsNewComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
