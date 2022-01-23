import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.scss']
})
export class UserQuizComponent implements OnInit {

  

  

  constructor() { }

  ngOnInit(): void {
  }

  onTimeOver(event: boolean) {
    console.log(event);
    this.submit();
  }

  submit() {
    console.log('Quiz Submitted')
  }

  nextQues(){

  }

  previousQues() {

  }


}
