import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-quiz-instructions',
  templateUrl: './user-quiz-instructions.component.html',
  styleUrls: ['./user-quiz-instructions.component.scss']
})
export class UserQuizInstructionsComponent implements OnInit {

  quizId: number = -1;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.quizId = id;
    })
  }  
}
