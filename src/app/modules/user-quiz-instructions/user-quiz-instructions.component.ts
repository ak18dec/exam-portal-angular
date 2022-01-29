import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-quiz-instructions',
  templateUrl: './user-quiz-instructions.component.html',
  styleUrls: ['./user-quiz-instructions.component.scss']
})
export class UserQuizInstructionsComponent implements OnInit {

  @Input() quizId: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
