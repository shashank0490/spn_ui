import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLevel0Component } from './org-level0.component';

describe('OrgLevel0Component', () => {
  let component: OrgLevel0Component;
  let fixture: ComponentFixture<OrgLevel0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgLevel0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgLevel0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
