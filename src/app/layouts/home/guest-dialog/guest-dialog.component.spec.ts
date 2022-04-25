import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDialogComponent } from './guest-dialog.component';

describe('GuestDialogComponent', () => {
  let component: GuestDialogComponent;
  let fixture: ComponentFixture<GuestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
