import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFundingComponent } from './admin-funding.component';

describe('AdminFundingComponent', () => {
  let component: AdminFundingComponent;
  let fixture: ComponentFixture<AdminFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
