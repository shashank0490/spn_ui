import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './pages/home/events/events.component';
import { FundingComponent } from './pages/home/funding/funding.component';
import { GrowthComponent } from './pages/home/growth/growth.component';
import { HowitworksComponent } from './pages/home/howitworks/howitworks.component';
import { NewsComponent } from './pages/home/news/news.component';
import { ResourcesComponent } from './pages/home/resources/resources.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/home/homepage/homepage.component';
import { OrganisationComponent } from './pages/organisation/organisation.component';
import { EventListComponent } from './pages/event-profile/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event-profile/event-details/event-details.component';
import { UserHomeComponent } from './user/home/user-home.component';
import { ForgotPasswordComponent } from './pages/home/forgot-password/forgot-password.component';
import { SuccessDialogComponent } from './pages/home/success-dialog/success-dialog.component';
import { NgoLandingPageComponent } from './pages/ngo-landing-page/ngo-landing-page.component';
import { PageUnderConstructionComponent } from './shared/page-under-construction/page-under-construction.component';
import { NgoUserGuard } from './shared/auth-guards/ngo-user.guard';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    // component: HomepageComponent,
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),

  },
  {
    path: 'event',
    component: EventsComponent,
  },
  {
    path: 'funding',
    component: FundingComponent,
  },
  {
    path: 'growth',
    component: GrowthComponent,
  },
  {
    path: 'howitworks',
    component: HowitworksComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'resources',
    component: ResourcesComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password-success',
    component: SuccessDialogComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'organisation-list',
    component: OrganisationComponent,
  },
  {
    path: "event-list",
    component: EventListComponent,
  },
  {
    path: "event-details/:id",
    component: EventDetailsComponent
  },
  {
    path: "ngo-landing",
    canActivate:[NgoUserGuard],
    component: NgoLandingPageComponent
  },
  {
    path: "terms-and-condition",
    component: TermsandconditionComponent
  },
  {
    path: "page-under-construction",
    component: PageUnderConstructionComponent
  },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./admin/admin.module').then(
  //       (m) => m.AdminModule
  //     ),
  // },
  {
    path: 'organisation',
    loadChildren: () =>
      import('./pages/organisation-profile/organisation-profiling.module').then(
        (m) => m.OrganisationProfilingModule
      ),
  },

  // path: "organisation-profile",
  // component: OrganisationProfileComponent,
  // children:[
  //   {path: "about", component: AboutComponent},
  //   {path: "people", component: PeopleComponent},
  //   {path: "compliance", component: ComplianceComponent},
  //   {path: "documentation", component: DocumentationComponent},
  //   {path: "contact", component: ContactSocialComponent}
  // ]
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    },
  {
    path: 'user-profile',
    canActivate:[NgoUserGuard],
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
