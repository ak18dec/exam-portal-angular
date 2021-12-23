import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultsComponent } from './defaults.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { CategoriesComponent } from 'src/app/modules/categories/categories.component';
import { GenresComponent } from 'src/app/modules/genres/genres.component';
import { InstructionsComponent } from 'src/app/modules/instructions/instructions.component';
import { QuestionsComponent } from 'src/app/modules/questions/questions.component';
import { QuizComponent } from 'src/app/modules/quiz/quiz.component';
import { SubjectsComponent } from 'src/app/modules/subjects/subjects.component';
import { TopicsComponent } from 'src/app/modules/topics/topics.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from 'src/app/modules/users/users.component';



@NgModule({
  declarations: [
    DefaultsComponent,
    DashboardComponent,
    CategoriesComponent,
    InstructionsComponent,
    QuestionsComponent,
    TopicsComponent,
    QuizComponent,
    SubjectsComponent,
    GenresComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    SharedModule,
    RouterModule
  ]
})
export class DefaultsModule { }
