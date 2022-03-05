// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { Quiz } from 'src/app/models/quiz';

import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, startWith } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
@Component({
  selector: 'app-user-quiz-list',
  templateUrl: './user-quiz-list.component.html',
  styleUrls: ['./user-quiz-list.component.scss']
})
export class UserQuizListComponent implements OnInit {

  search = new FormControl();
  data: any[] = [];
  dataLoaded: boolean = false;

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.getAllQuizes();
  }

  $search = this.search.valueChanges.pipe(
    startWith(null),
    debounceTime(200),
    switchMap((res: string) => {
      if (!res) return of(this.data);
      res = res.trim().toLowerCase();
      return of(
        this.data.filter(x => x.title.toLowerCase().indexOf(res) >= 0)
      );
    })
  );

  startQuiz(quizId: number) {
    this.router.navigate([`/user/quiz/${quizId}/instructions`]);
  }

  getAllQuizes(){
    this.data = this.quizService.getQuizesFromCache();
    if(this.data.length < 1) {
      this.quizService.getQuizes().subscribe(
        (res: any) =>{
          this.data = res;
          console.log(res)
          this.quizService.storeQuizesInCache(this.data);
          this.dataLoaded = true;
        },
        (error) => {
          console.log(error)
        }
        )
    }
  }

}
