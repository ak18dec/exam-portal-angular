import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home.component';
import { UserDashboardComponent } from 'src/app/modules/user-dashboard/user-dashboard.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimerComponent } from 'src/app/modules/timer/timer.component';
import { UserQuestionComponent } from 'src/app/modules/user-question/user-question.component';
import { QuestionTrackerComponent } from 'src/app/modules/question-tracker/question-tracker.component';
import { UserQuizComponent } from 'src/app/modules/user-quiz/user-quiz.component';
import { QuizSubmitConfirmDialogComponent } from 'src/app/modules/user-question/quiz-submit-confirm-dialog/quiz-submit-confirm-dialog.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserDashboardComponent,
    TimerComponent,
    UserQuestionComponent,
    QuestionTrackerComponent,
    UserQuizComponent,
    QuizSubmitConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    SharedModule
  ]
})
export class UserHomeModule { }
