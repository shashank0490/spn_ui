import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { CommonFunctionService } from './services/common-function/common-function.service';
import { OrganisationComponent } from './pages/organisation/organisation.component';
import { AuthInterceptor } from './auth.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
// import { GrowthComponent } from './pages/home/growth/growth.component';
import { NewsComponent } from './pages/home/news/news.component';
import { ServicesComponent } from './pages/home/services/services.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { OrganisationProfilingModule } from './pages/organisation-profile/organisation-profiling.module';
import { EventListComponent } from './pages/event-profile/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event-profile/event-details/event-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { OrganisationProfileComponent } from './pages/organisation-profile/organisation-profile.component';
import { AdminModule } from './admin/admin.module';
import { EventJoinComponent } from './pages/event-profile/event-join/event-join.component';
import { UserHomeComponent } from './user/home/user-home.component';
import { HomeModule } from './pages/home/home.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgoLandingPageComponent } from './pages/ngo-landing-page/ngo-landing-page.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    OrganisationComponent,
    // GrowthComponent,
    EventListComponent,
    EventDetailsComponent,
    EventJoinComponent,
    UserHomeComponent,
    NgoLandingPageComponent,
    TermsandconditionComponent,
    // OrganisationProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    OrganisationProfilingModule,
    NgxPaginationModule,
    AdminModule,
    HomeModule,
    NgxCaptchaModule,
    HotToastModule.forRoot(),
    MatDialogModule,
    RouterModule.forRoot([])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CommonFunctionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
