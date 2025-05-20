import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSubmitConfirmDialogComponent } from './quiz-submit-confirm-dialog.component';

describe('QuizSubmitConfirmDialogComponent', () => {
  let component: QuizSubmitConfirmDialogComponent;
  let fixture: ComponentFixture<QuizSubmitConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSubmitConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSubmitConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
