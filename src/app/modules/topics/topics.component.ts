import { Component, OnInit, ViewChild } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { CategoryService } from 'src/app/services/category.service';
import { TopicService } from 'src/app/services/topic.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TopicDialogComponent } from './topic-dialog/topic-dialog.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  // newTopic: boolean = false;

  // addBtnClicked: boolean = false;
  // topics: Topic[] = [];
  // categoriesList: any[] = [];

  // newTopicData: any = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   categoryId: 0,
  //   enabled: true
  // }

  // constructor(private _snackBar: MatSnackBar, private topicService: TopicService, private categoryService: CategoryService) { }

  // ngOnInit() {
  //   this.freshForm();
  //   this.getAllTopics();
  //   this.categoriesList.length = 0;
  //   this.categoryService.getCategories().subscribe(
  //     (data: any) => {
  //       data.forEach((d: { id: any; title: any; enabled: any; }) => {
  //         if(d.enabled){
  //           this.categoriesList.push({id: d.id, label: d.title, enabled: d.enabled});
  //         }
  //       });
  //     },
  //     (error)=>{
  //       this._snackBar.open('Error while fetching categories list','',{
  //         duration: 3000
  //       });
  //     }
  //   );
  // }

  // getAllTopics() {
  //   this.topicService.getTopics().subscribe(
  //     (res: any) => {
  //       this.topics = res;
  //     },
  //     (error) => {
  //       this._snackBar.open('Error while fetching topics list','',{
  //         duration: 3000
  //       });
  //     } 
  //   )
  // }

  // freshForm(){
  //   this.newTopic = false;
  //   this.addBtnClicked = false;
  //   this.newTopicData.title = '';
  //   this.newTopicData.id = 0
  //   this.newTopicData.description = '';
  //   this.newTopicData.categoryId = 0;
  //   this.newTopicData.enabled = true;
  // }

  // backToTopics() {
  //   this.freshForm();
  // }

  // addTopic() {
  //   this.freshForm();
  //   this.newTopic = true;
  //   this.addBtnClicked = true;
  // }

  // editTopic(editableTopic: any){
  //   this.newTopic = true;
  //   this.addBtnClicked = false;
  //   this.newTopicData.title = editableTopic.title;
  //   this.newTopicData.description = editableTopic.description;
  //   this.newTopicData.id = editableTopic.id;
  //   this.newTopicData.enabled = editableTopic.enabled;
  //   this.newTopicData.categoryId = editableTopic.categoryId;
  // }

  // deleteTopic(id: number){
  //   this.topicService.deleteTopic(id).subscribe(
  //     (res)=>{
  //       if(res){
  //         let idxToDelete = this.topics.findIndex(t => t.id === id);
  //         this.topics.splice(idxToDelete, 1);

  //         this._snackBar.open(`Topic removed successfully`,'',{
  //           duration: 3000
  //         });
  //         this.freshForm();
  //       }
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   );
  // }

  // toggleTopicStatus(id: number, idx: number){
  //   let oldState = this.topics[idx].enabled;
  //   this.topics[idx].enabled = !oldState;

  //   this.topicService.toggleTopicState(this.topics[idx],id).subscribe(
  //     (res) => {
  //       if (res) {
  //         let status = this.topics[idx].enabled ? 'enabled' : 'disabled';
  //         this._snackBar.open(`Topic ${status} successfully`, '', {
  //           duration: 3000
  //         });
  //       }
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   )
  // }

  // submitForm(topicForm: any) {
  //   if(!this.newTopicData.title){
  //     this._snackBar.open('Please provide Topic title','',{
  //       duration: 3000
  //     });
  //     return;
  //   }

  //   if(this.addBtnClicked){
  //     this.createTopic();
  //   }else{
  //     this.updateTopic();
  //   }
    
  // }

  // updateTopic(){

  //   this.topicService.updateTopic(this.newTopicData, this.newTopicData.id).subscribe(
  //     (data)=>{
  //       if(data) {
  //         let idxToUpdate = this.topics.findIndex(c=>c.id === this.newTopicData.id);
  //         this.topics[idxToUpdate].title = this.newTopicData.title;
  //         this.topics[idxToUpdate].description = this.newTopicData.description;
  //         this.topics[idxToUpdate].categoryId = this.newTopicData.categoryId;
  //         this.topics[idxToUpdate].enabled = this.newTopicData.enabled;
          
  //         this._snackBar.open('Topic updated successfully','',{
  //           duration: 3000
  //         });
  
  //         this.freshForm();
  //       }
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   );

  // }

  // createTopic(){
  //   this.topicService.addTopic(this.newTopicData).subscribe(
  //     (data)=>{
  //       this.topics.push(data);
  //       this._snackBar.open(`${this.newTopicData.title} is added successfully to list`,'',{
  //         duration: 3000
  //       });

  //       this.freshForm();
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   )
  // }

  // getCategoryName(categoryId: number) {
  //   return this.categoriesList.find(c => c.id === categoryId).label;
  // }

  dataSource: MatTableDataSource<any>;

  topics: Topic[]=[];

  columns: string[] = ['id','title', 'description', 'subjectId','enabled', 'action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  newTopicData: Topic = {
    id: -1,
    title: '',
    description: '',
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
      this.createTopic(result);
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
          description: '',
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
    let sameDescription = false;
    if(topic1 && topic1){
      if(topic1.title !== '' && topic2.title !== '' && topic1.title === topic2.title){
        sameTitle = true;
      }
      if(topic1.description !== '' && topic2.description !== '' && topic1.description === topic2.description){
        sameDescription = true;
      }
    }
    return sameTitle && sameDescription;
  }

  updateTopic(data: Topic) {
    this.topicService.updateTopic(data, data.id).subscribe(
      (res) => {
        if (res) {
          let idxToUpdate = this.topics.findIndex(t => t.id === data.id);
          this.topics[idxToUpdate].title = data.title;
          this.topics[idxToUpdate].description = data.description;
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
