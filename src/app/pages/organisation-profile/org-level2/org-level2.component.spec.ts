import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLevel2Component } from './org-level2.component';

describe('OrgLevel2Component', () => {
  let component: OrgLevel2Component;
  let fixture: ComponentFixture<OrgLevel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgLevel2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
