import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MaterialModule } from '../material.module';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';
import { AlphabetOnlyDirective } from './directives/alphabet-only.directive';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@NgModule({
  declarations: [OtpVerificationComponent, CardComponent, PaginationComponent, PageUnderConstructionComponent,AlphabetOnlyDirective, AddUserDialogComponent],
  imports: [CommonModule, MatDialogModule, NgOtpInputModule, MaterialModule,FormsModule,
    ReactiveFormsModule,],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    OtpVerificationComponent,
    NgOtpInputModule,
    MaterialModule,
    CardComponent,
    PaginationComponent,
    AlphabetOnlyDirective,
    AddUserDialogComponent
  ],
  // providers: [OtpVerificationComponent]
  // entryComponents: [ OtpVerificationComponent ]
})
export class SharedModule {}
