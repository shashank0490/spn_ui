import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePasswordResetComponent } from './profile-password-reset.component';

describe('ProfilePasswordResetComponent', () => {
  let component: ProfilePasswordResetComponent;
  let fixture: ComponentFixture<ProfilePasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePasswordResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
