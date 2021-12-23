import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { CategoryService } from 'src/app/services/category.service';
import { TopicService } from 'src/app/services/topic.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  newTopic: boolean = false;

  addBtnClicked: boolean = false;
  topics: Topic[] = [];
  categoriesList: any[] = [];

  newTopicData: any = {
    id: 0,
    title: '',
    description: '',
    categoryId: 0,
    enabled: true
  }

  constructor(private _snackBar: MatSnackBar, private topicService: TopicService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.freshForm();
    this.getAllTopics();
    this.categoriesList.length = 0;
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        data.forEach((d: { id: any; title: any; enabled: any; }) => {
          if(d.enabled){
            this.categoriesList.push({id: d.id, label: d.title, enabled: d.enabled});
          }
        });
      },
      (error)=>{
        this._snackBar.open('Error while fetching categories list','',{
          duration: 3000
        });
      }
    );
  }

  getAllTopics() {
    this.topicService.getTopics().subscribe(
      (res: any) => {
        this.topics = res;
      },
      (error) => {
        this._snackBar.open('Error while fetching topics list','',{
          duration: 3000
        });
      } 
    )
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
    this.topicService.deleteTopic(id).subscribe(
      (res)=>{
        if(res){
          let idxToDelete = this.topics.findIndex(t => t.id === id);
          this.topics.splice(idxToDelete, 1);

          this._snackBar.open(`Topic removed successfully`,'',{
            duration: 3000
          });
          this.freshForm();
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );
  }

  toggleTopicStatus(id: number, idx: number){
    let oldState = this.topics[idx].enabled;
    this.topics[idx].enabled = !oldState;

    this.topicService.toggleTopicState(this.topics[idx],id).subscribe(
      (res) => {
        if (res) {
          let status = this.topics[idx].enabled ? 'enabled' : 'disabled';
          this._snackBar.open(`Topic ${status} successfully`, '', {
            duration: 3000
          });
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    )
  }

  submitForm(topicForm: any) {
    if(!this.newTopicData.title){
      this._snackBar.open('Please provide Topic title','',{
        duration: 3000
      });
      return;
    }

    if(this.addBtnClicked){
      this.createTopic();
    }else{
      this.updateTopic();
    }
    
  }

  updateTopic(){

    this.topicService.updateTopic(this.newTopicData, this.newTopicData.id).subscribe(
      (data)=>{
        if(data) {
          let idxToUpdate = this.topics.findIndex(c=>c.id === this.newTopicData.id);
          this.topics[idxToUpdate].title = this.newTopicData.title;
          this.topics[idxToUpdate].description = this.newTopicData.description;
          this.topics[idxToUpdate].categoryId = this.newTopicData.categoryId;
          this.topics[idxToUpdate].enabled = this.newTopicData.enabled;
          
          this._snackBar.open('Topic updated successfully','',{
            duration: 3000
          });
  
          this.freshForm();
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );

  }

  createTopic(){
    this.topicService.addTopic(this.newTopicData).subscribe(
      (data)=>{
        this.topics.push(data);
        this._snackBar.open(`${this.newTopicData.title} is added successfully to list`,'',{
          duration: 3000
        });

        this.freshForm();
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    )
  }

  getCategoryName(categoryId: number) {
    return this.categoriesList.find(c => c.id === categoryId).label;
  }


}
