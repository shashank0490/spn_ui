import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWebpagesComponent } from './admin-webpages.component';

describe('AdminWebpagesComponent', () => {
  let component: AdminWebpagesComponent;
  let fixture: ComponentFixture<AdminWebpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWebpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWebpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
