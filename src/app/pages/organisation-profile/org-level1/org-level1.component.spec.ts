import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLevel1Component } from './org-level1.component';

describe('OrgLevel1Component', () => {
  let component: OrgLevel1Component;
  let fixture: ComponentFixture<OrgLevel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgLevel1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
