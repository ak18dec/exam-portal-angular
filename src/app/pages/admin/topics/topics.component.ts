import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  newTopic: boolean = false;

  addBtnClicked: boolean = false;
  topics: any[] = [];
  categoriesList: any[] = [];

  newTopicData: any = {
    id: 0,
    title: '',
    description: '',
    categoryId: 0,
    enabled: true
  }

  constructor() { }

  ngOnInit() {
    this.freshForm();
  }

  freshForm(){
    this.newTopic = false;
    this.addBtnClicked = false;
    this.newTopicData.title = '';
    this.newTopicData.id = 0
    this.newTopicData.description = '';
    this.newTopicData.categoryId = 0;
    this.newTopicData.enabled = true;
  }

  backToTopics() {
    this.freshForm();
  }

  addTopic() {
    this.freshForm();
    this.newTopic = true;
    this.addBtnClicked = true;
  }

  editTopic(editableTopic: any){
    this.newTopic = true;
    this.addBtnClicked = false;
    this.newTopicData.title = editableTopic.title;
    this.newTopicData.description = editableTopic.description;
    this.newTopicData.id = editableTopic.id;
    this.newTopicData.enabled = editableTopic.enabled;
    this.newTopicData.categoryId = editableTopic.categoryId;
  }

  deleteTopic(id: number){
    // this.subjectService.deleteSubject(id).subscribe(
    //   (res)=>{
    //     this.subjects = res;
    //     this._snackBar.open(`Subject removed successfully`,'',{
    //       duration: 3000
    //     });
    //     this.freshForm();
    //   },
    //   (error)=>{
    //     this._snackBar.open(error,'',{
    //       duration: 3000
    //     });
    //   }
    // );
  }

  toggleTopicStatus(id: number, idx: number){
    // this.subjectService.toggleSubjectState(id).subscribe(
    //   (res)=>{
    //     this.subjects = res;
    //     let status = this.subjects[idx].enabled ? 'enabled' : 'disabled';
    //     this._snackBar.open(`Subject ${status} successfully`,'',{
    //       duration: 3000
    //     });
    //   },
    //   (error)=>{
    //     this._snackBar.open(error,'',{
    //       duration: 3000
    //     });
    //   }
    // )
  }

  submitForm(topicForm) {
    // console.log(this.newSubjectData);
    
    // if(!this.newSubjectData.title){
    //   this._snackBar.open('Please provide subject title','',{
    //     duration: 3000
    //   });
    //   return;
    // }

    // //if genre is inactive then subject will automatically become inactive
    // let genreStatus = this.genresList.find(g=> g.id === this.newSubjectData.genreId).enabled;
    // if(!genreStatus){
    //   this.newSubjectData.enabled = false;
    // }else{
    //   this.newSubjectData.enabled = true;
    // }

    // if(this.addBtnClicked){
    //   this.createSubject();
    // }else{
    //   this.updateSubject();
    // }
    
  }


}
