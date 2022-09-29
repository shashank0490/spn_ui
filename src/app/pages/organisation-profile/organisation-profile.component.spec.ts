import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationProfileComponent } from './organisation-profile.component';

describe('OrganisationProfileComponent', () => {
  let component: OrganisationProfileComponent;
  let fixture: ComponentFixture<OrganisationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
