import { Component, Input, OnInit } from '@angular/core';
import { UserquizService } from 'src/app/services/userquiz.service';

@Component({
  selector: 'app-quiz-score',
  templateUrl: './quiz-score.component.html',
  styleUrls: ['./quiz-score.component.scss']
})
export class QuizScoreComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void { }

}
