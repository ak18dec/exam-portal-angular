import { Component, OnInit, ViewChild } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import { MatSort } from '@angular/material/sort';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TopicDialogComponent } from './topic-dialog/topic-dialog.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  topics: Topic[]=[];

  columns: string[] = ['id','title', 'subjectId','enabled', 'action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  newTopicData: Topic = {
    id: -1,
    title: '',
    subjectId: -1,
    enabled: true
  }

  constructor(public dialog: MatDialog, private topicService: TopicService) { }

  ngOnInit(): void {
    this.getAllTopics();
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(TopicDialogComponent, {
      width: '300px',
      data: Object.assign({},this.newTopicData)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result !== ""){
        const sameData = this.validateTopic(this.newTopicData, result);
        if(!sameData){
          this.createTopic(result);
        }
      }
    });
  }

  deleteTopic(data: any){
    this.topicService.deleteTopic(data.id).subscribe(
      (res)=>{
        if(res){
          let idxToDelete = this.topics.findIndex(t => t.id === data.id);
          this.topics.splice(idxToDelete, 1);
          this.dataSource._updateChangeSubscription();

          // this._snackBar.open(`Topic removed successfully`,'',{
          //   duration: 3000
          // });
          // this.freshForm();
        }
      },
      (error)=>{
        // this._snackBar.open(error,'',{
        //   duration: 3000
        // });
        console.log(error)
      }
    );
  }

  getAllTopics() {
    this.topicService.getTopics().subscribe(
      (res: any) => {
        this.topics = res;
        this.dataSource = new MatTableDataSource(this.topics);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        // this._snackBar.open('Error while fetching topics list','',{
        //   duration: 3000
        // });
        console.log(error);
      } 
    )
  }

  createTopic(data: Topic){
    this.topicService.addTopic(data).subscribe(
      (data)=>{
        this.topics.push(data);
        this.newTopicData = {
          id: -1,
          title: '',
          subjectId: -1,
          enabled: true
        }
        this.dataSource._updateChangeSubscription();
        // this._snackBar.open(`${this.newTopicData.title} is added successfully to list`,'',{
        //   duration: 3000
        // });

        // this.freshForm();
      },
      (error)=>{
        // this._snackBar.open(error,'',{
        //   duration: 3000
        // });
        console.log(error);
      }
    )
  }

  openEditDialog(editableRow:any) {

    let dialogRef = this.dialog.open(TopicDialogComponent, {
      width: '300px',
      data: Object.assign({},editableRow)
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result && result !== ""){
        const sameData = this.validateTopic(editableRow, result) && (editableRow.enabled === result.enabled);
        if(!sameData){
          this.updateTopic(result);
        }
      }
    });
  }

  validateTopic(topic1: Topic, topic2: Topic): boolean {
    let sameTitle = false;
    if(topic1 && topic1){
      if(topic1.title !== '' && topic2.title !== '' && topic1.title === topic2.title){
        sameTitle = true;
      }
    }
    return sameTitle;
  }

  updateTopic(data: Topic) {
    this.topicService.updateTopic(data, data.id).subscribe(
      (res) => {
        if (res) {
          let idxToUpdate = this.topics.findIndex(t => t.id === data.id);
          this.topics[idxToUpdate].title = data.title;
          this.topics[idxToUpdate].subjectId = data.subjectId;
          this.topics[idxToUpdate].enabled = data.enabled;

          // this._snackBar.open('Topic updated successfully', '', {
          //   duration: 3000
          // });

          // this.freshForm();
          this.dataSource._updateChangeSubscription();
        }
      },
      (error) => {
        // this._snackBar.open(error, '', {
        //   duration: 3000
        // });
        console.log(error);
      }
    );
  }


}
