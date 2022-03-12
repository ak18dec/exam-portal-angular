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
import { UserAnalyticsComponent } from 'src/app/modules/user-analytics/user-analytics.component';
import { UserQuizListComponent } from 'src/app/modules/user-quiz-list/user-quiz-list.component';
import { UserQuizInstructionsComponent } from 'src/app/modules/user-quiz-instructions/user-quiz-instructions.component';
import { QuizScoreComponent } from 'src/app/modules/quiz-score/quiz-score.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserDashboardComponent,
    TimerComponent,
    UserQuestionComponent,
    QuestionTrackerComponent,
    UserQuizComponent,
    QuizSubmitConfirmDialogComponent,
    UserAnalyticsComponent,
    UserQuizListComponent,
    UserQuizInstructionsComponent,
    QuizScoreComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    SharedModule
  ]
})
export class UserHomeModule { }
