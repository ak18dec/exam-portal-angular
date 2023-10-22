import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Proficiency } from 'src/app/models/proficiency';
import { Question } from 'src/app/models/question';
import { QuestionChoice } from 'src/app/models/questionchoice';
import { Topic } from 'src/app/models/topic';
import { QuestionService } from 'src/app/services/question.service';
import { TopicService } from 'src/app/services/topic.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  questions: Question[]=[];

  columns: string[] = ['id', 'description', 'proficiency','topicId','enabled', 'action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }


  getAllQuestions() {
    this.questionService.getQuestions().subscribe(
      (res: any) => {
        this.questions = res;
        this.dataSource = new MatTableDataSource(this.questions);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        // this._snackBar.open('Error while fetching questions list','',{
        //   duration: 3000
        // });
        console.log(error);
      } 
    )
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteQuestion(data: any){
    this.questionService.deleteQuestion(data.id).subscribe(
      (res: any) => {
        if(res){
          let idxToDelete = this.questions.findIndex(u => u.id === data.id);
          this.questions.splice(idxToDelete, 1);
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
