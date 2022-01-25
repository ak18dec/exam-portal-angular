import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.scss']
})
export class UserQuizComponent implements OnInit {

  quizQuestions: Question[] = [];
  
  @Input() quizId: number = -1;
  dataLoaded: boolean = false;


  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizId = 3;
    this.getQuestionsByQuizId(this.quizId);
  }


  getQuestionsByQuizId(id: number) {
    this.quizService.getQuestionsByQuizId(id).subscribe({
      next: (resp: any) => {
        this.quizQuestions = resp;
        this.dataLoaded = true;
      },
      error: (e)=> console.log(e)
    })
  }


}
