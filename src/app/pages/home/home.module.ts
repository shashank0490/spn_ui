import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingComponent } from './funding/funding.component';
import { EventsComponent } from './events/events.component';
import { ResourcesComponent } from './resources/resources.component';
import { NewsComponent } from './news/news.component';
import { ServicesComponent } from './services/services.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GrowthComponent } from './growth/growth.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
];
@NgModule({
  declarations: [
    HowitworksComponent,
    GrowthComponent,
    TestimonialComponent,
    HomepageComponent,
    FundingComponent,
    EventsComponent,
    NewsComponent,
    ServicesComponent,
    ResourcesComponent,
    ForgotPasswordComponent,
    SuccessDialogComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes),CommonModule, ],
})
export class HomeModule {}
