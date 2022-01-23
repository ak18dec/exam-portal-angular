import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTrackerComponent } from './question-tracker.component';

describe('QuestionTrackerComponent', () => {
  let component: QuestionTrackerComponent;
  let fixture: ComponentFixture<QuestionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
