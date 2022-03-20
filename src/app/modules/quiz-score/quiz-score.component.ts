import { Component, Input, OnInit } from '@angular/core';
import { UserquizService } from 'src/app/services/userquiz.service';

@Component({
  selector: 'app-quiz-score',
  templateUrl: './quiz-score.component.html',
  styleUrls: ['./quiz-score.component.scss']
})
export class QuizScoreComponent implements OnInit {

  @Input() data: any;

  failicon: string = 'https://img.icons8.com/color/30/000000/test-failed.png'
  passfailicon: string = 'https://img.icons8.com/office/30/000000/test-partial-passed.png'
  passicon: string = 'https://img.icons8.com/office/30/000000/test-passed.png'

  scoreIcon: string;

  constructor() { }

  ngOnInit(): void { 
    if(this.data){
      if(this.data.score === 0){
        this.scoreIcon = this.failicon;
      }else if (this.data.incorrectQuestions === 0){
        this.scoreIcon = this.passicon;
      }else {
        this.scoreIcon = this.passfailicon;
      }
    }
  }

}
