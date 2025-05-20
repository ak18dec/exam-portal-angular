import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home.component';
import { UserDashboardComponent } from 'src/app/modules/user-dashboard/user-dashboard.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimerComponent } from 'src/app/modules/timer/timer.component';
import { QuestionTrackerComponent } from 'src/app/modules/question-tracker/question-tracker.component';
import { UserQuizComponent } from 'src/app/modules/user-quiz/user-quiz.component';
import { UserAnalyticsComponent } from 'src/app/modules/user-analytics/user-analytics.component';
import { UserQuizListComponent } from 'src/app/modules/user-quiz-list/user-quiz-list.component';
import { QuizScoreComponent } from 'src/app/modules/quiz-score/quiz-score.component';
import { QuizCertificateComponent } from 'src/app/modules/quiz-certificate/quiz-certificate.component';
import { QuizSubmitConfirmDialogComponent } from 'src/app/modules/user-quiz/quiz-submit-confirm-dialog/quiz-submit-confirm-dialog.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserDashboardComponent,
    TimerComponent,
    QuestionTrackerComponent,
    UserQuizComponent,
    UserAnalyticsComponent,
    UserQuizListComponent,
    QuizScoreComponent,
    QuizCertificateComponent,
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
