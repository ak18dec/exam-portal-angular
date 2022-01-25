import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz';
@Component({
  selector: 'app-user-quiz-list',
  templateUrl: './user-quiz-list.component.html',
  styleUrls: ['./user-quiz-list.component.scss']
})
export class UserQuizListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  quizes: Quiz[]=[];

  columns: string[] = ['id', 'title', 'description', 'subject', 'topic', 'previousAttempts', 'action'];
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;


  constructor(private quizService: QuizService) { }

  quizLoaded: boolean = false;

  ngOnInit() {
    this.getAllQuizes();
  }

  getAllQuizes(){
    this.quizes = this.quizService.getQuizesFromCache();
    this.setDataSource(this.quizes);
    if(this.quizes.length < 1) {
      this.quizService.getQuizes().subscribe(
        (res: any) =>{
          this.quizes = res;
          this.setDataSource(this.quizes);
          console.log(this.quizes)
          this.quizService.storeQuizesInCache(this.quizes);
        },
        (error) => {
          console.log(error)
        }
        )
    }
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setDataSource(quizList: Quiz[]){
    this.dataSource = new MatTableDataSource(quizList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
