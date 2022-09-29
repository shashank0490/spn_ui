import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWhatsNewComponent } from './admin-whats-new.component';

describe('AdminWhatsNewComponent', () => {
  let component: AdminWhatsNewComponent;
  let fixture: ComponentFixture<AdminWhatsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWhatsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWhatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
