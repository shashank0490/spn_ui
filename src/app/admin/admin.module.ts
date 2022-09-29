import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminWebpagesComponent } from './admin-webpages/admin-webpages.component';
import { AdminFundingComponent } from './admin-funding/admin-funding.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminResourcesComponent } from './admin-resources/admin-resources.component';
import { AdminWhatsNewComponent } from './admin-whats-new/admin-whats-new.component';
import { AdminNgoComponent } from './admin-ngo/admin-ngo.component';
import { MoreServicesComponent } from './more-services/more-services.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AdminComponent,AdminSidebarComponent, AdminWebpagesComponent, AdminFundingComponent, AdminEventsComponent, AdminDashboardComponent, AdminResourcesComponent, AdminWhatsNewComponent, AdminNgoComponent, MoreServicesComponent,],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
