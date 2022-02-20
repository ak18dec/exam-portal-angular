import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  quizTime: number = -1;

  quizMetaData: any;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if(id){
        this.quizId = id;
        this.getQuestionsByQuizId(this.quizId);
        this.quizTime = this.quizService.getSelectedQuizTime(this.quizId);
        console.log(`ye h qiuz time ${this.quizTime}`)
        this.quizMetaData = this.quizService.getQuizMetaData(this.quizId)
      }
    })
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
