import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-quiz-instructions',
  templateUrl: './user-quiz-instructions.component.html',
  styleUrls: ['./user-quiz-instructions.component.scss']
})
export class UserQuizInstructionsComponent implements OnInit {

  @Input() quizId: number = -1;
  @Output() quizStartEvent: EventEmitter<any> = new EventEmitter();

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    // console.log('Quiz id in instructions page: '+this.quizId);
  }

  startQuiz() {
    this.quizStartEvent.emit();
  }
  
  
}
