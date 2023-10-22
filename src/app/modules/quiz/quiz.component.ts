import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  quizes: Quiz[]=[];

  columns: string[] = ['id','title', 'description','published', 'action'];
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;


  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.getAllQuizes();
  }

  getAllQuizes(){
    this.quizService.getQuizes().subscribe(
      (res: any) =>{
        this.quizes = res;
        this.dataSource = new MatTableDataSource(this.quizes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error)
      }
      )
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteQuiz(data: any) {
    this.quizService.deleteQuiz(data.id).subscribe(
      (res: any) => {
        if(res){
          let idxToDelete = this.quizes.findIndex(q => q.id === data.id);
          this.quizes.splice(idxToDelete, 1);
          this.dataSource._updateChangeSubscription();

          // this._snackBar.open(`User removed successfully`,'',{
          //   duration: 3000
          // });
          // this.freshForm();
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  


}
