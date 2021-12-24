import { Component, OnInit, ViewChild } from '@angular/core';
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

  // newQuestion: boolean = false;

  // addBtnClicked: boolean = false;
  // questions: Question[] = [];
  // proficiencyList: Proficiency[] = [];
  // topicsList: any[] = [{id: 1, title: 'Algebra'}, {id: 2, title: 'Geometry'},{id: 3, title: 'Calculus'}];

  // newQuestionData: Question = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   topicId: 0,
  //   enabled: true,
  //   proficiencyId: 0,
  //   questionChoices:[]
  // }


  // newQuestionChoices: QuestionChoice[] = [
  //   {id: 0, description: '', enabled: true, correct: false, questionId: 0},
  //   {id: 0, description: '', enabled: true, correct: false, questionId: 0},
  //   {id: 0, description: '', enabled: true, correct: false, questionId: 0},
  //   {id: 0, description: '', enabled: true, correct: false, questionId: 0}
  // ];

  // constructor(private _snackBar: MatSnackBar, private topicService: TopicService, private questionService: QuestionService) { }

  // ngOnInit() {
  //   this.freshForm();
  //   this.getProficiencies();
  //   this.getAllQuestions();
  //   this.topicsList.length = 0;
  //   this.topicService.getTopics().subscribe(
  //     (data: any) => {
  //       data.forEach((d: { id: any; title: any; enabled: any; }) => {
  //         if(d.enabled){
  //           this.topicsList.push({id: d.id, label: d.title, enabled: d.enabled});
  //         }
  //       });
  //     },
  //     (error)=>{
  //       this._snackBar.open('Error while fetching topics list','',{
  //         duration: 3000
  //       });
  //     }
  //   );
  // }

  // getProficiencies(){
  //   this.proficiencyList = [
  //     {id: 1, level: 'Easy'},{id: 2, level: 'Medium'},{id: 3, level: 'Hard'}
  //   ]
  // }

  // getAllQuestions() {
  //   this.questionService.getQuestions().subscribe(
  //     (res: any) => {
  //       this.questions = res;
  //       console.log(this.questions);
  //     },
  //     (error) => {
  //       this._snackBar.open('Error while fetching questions list','',{
  //         duration: 3000
  //       });
  //     } 
  //   )
  // }

  // getQuestionProficiency(pid: number){
  //   return this.proficiencyList.find(p => p.id === pid)?.level;
  // }

  // freshForm(){
  //   this.newQuestion = false;
  //   this.addBtnClicked = false;
  //   this.newQuestionData.title = '';
  //   this.newQuestionData.id = 0
  //   this.newQuestionData.description = '';
  //   this.newQuestionData.topicId = 0;
  //   this.newQuestionData.proficiencyId = 0;
  //   this.newQuestionData.enabled = true;
  //   this.newQuestionData.questionChoices = [];
  //   this.newQuestionChoices = [
  //     {id: 0, description: '', enabled: true, correct: false, questionId: 0},
  //     {id: 0, description: '', enabled: true, correct: false, questionId: 0},
  //     {id: 0, description: '', enabled: true, correct: false, questionId: 0},
  //     {id: 0, description: '', enabled: true, correct: false, questionId: 0}
  //   ];
  // }

  // backToQuestions(){
  //   this.freshForm();
  // }

  // addQuestion() {
  //   this.freshForm();
  //   this.newQuestion = true;
  //   this.addBtnClicked = true;
  // }

  // editQuestion(editableQuestion: Question){
  //   this.newQuestion = true;
  //   this.addBtnClicked = false;
  //   this.newQuestionData.id = editableQuestion.id;
  //   this.newQuestionData.title = editableQuestion.title;
  //   this.newQuestionData.description = editableQuestion.description;
  //   this.newQuestionData.enabled = editableQuestion.enabled;
  //   this.newQuestionData.topicId = editableQuestion.topicId;
  //   this.newQuestionData.proficiencyId = editableQuestion.proficiencyId;
  //   if(editableQuestion.questionChoices) {
  //     for (const key in editableQuestion.questionChoices) {
  //       this.newQuestionChoices[key] = editableQuestion.questionChoices[key];
  //     }

  //     console.log(this.newQuestionChoices)
  //   }
  //   this.newQuestionData.questionChoices = this.newQuestionChoices;
  //   console.log(this.newQuestionData);
  // }

  // deleteQuestion(id: number){
  //   this.questionService.deleteQuestion(id).subscribe(
  //     (res)=>{
  //       if(res){
  //         let idxToDelete = this.questions.findIndex(q => q.id === id);
  //         this.questions.splice(idxToDelete, 1);

  //         this._snackBar.open(`Question removed successfully`,'',{
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

  // toggleQuestionStatus(quesId: number, idx: number) {
  //   let oldState = this.questions[idx].enabled;
  //   this.questions[idx].enabled = !oldState;

  //   this.questionService.toggleQuestionState(this.questions[idx],quesId).subscribe(
  //     (res) => {
  //       if (res) {
  //         let status = this.questions[idx].enabled ? 'enabled' : 'disabled';
  //         this._snackBar.open(`Question ${status} successfully`, '', {
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

  // submitForm(questionForm: any) {

  //   if(!this.newQuestionData.title){
  //     this._snackBar.open('Please provide Topic title','',{
  //       duration: 3000
  //     });
  //     return;
  //   }

  //   if(this.addBtnClicked){
  //     this.createQuestion();
  //   }else{
  //     this.updateQuestion();
  //   }

  // }

  // updateQuestion(){
  //   this.newQuestionData.questionChoices = this.newQuestionChoices.filter(ch => ch.description);
  //   this.questionService.updateQuestion(this.newQuestionData, this.newQuestionData.id).subscribe(
  //     (data)=>{
  //       if(data) {
  //         let idxToUpdate = this.questions.findIndex(q=>q.id === this.newQuestionData.id);
  //         this.questions[idxToUpdate].title = this.newQuestionData.title;
  //         this.questions[idxToUpdate].description = this.newQuestionData.description;
  //         this.questions[idxToUpdate].topicId = this.newQuestionData.topicId;
  //         this.questions[idxToUpdate].proficiencyId = this.newQuestionData.proficiencyId;
  //         this.questions[idxToUpdate].enabled = this.newQuestionData.enabled;
  //         this.questions[idxToUpdate].questionChoices = this.newQuestionData.questionChoices;
          
  //         this._snackBar.open('Question updated successfully','',{
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

  // createQuestion(){
  //   this.newQuestionData.questionChoices = this.newQuestionChoices.filter(ch => ch.description);
  //   this.newQuestionData.proficiencyId = 2;
  //   this.questionService.addQuestion(this.newQuestionData).subscribe(
  //     (data)=>{
  //       this.questions.push(data);
  //       this._snackBar.open(`${this.newQuestionData.title} is added successfully to list`,'',{
  //         duration: 3000
  //       });

  //       this.freshForm();
  //     },
  //     (error)=>{
  //       this._snackBar.open(JSON.stringify(error),'',{
  //         duration: 3000
  //       });
  //     }
  //   )
  // }

  // getTopicName(topicId: number) {
  //   return this.topicsList.find(t => t.id === topicId).label;
  // }

  
  dataSource: MatTableDataSource<any>;

  topics: Topic[]=[];

  columns: string[] = ['id','title', 'description', 'categoryId','enabled', 'action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {

    this.topics = [
      // {
      //   id: 1,
      //   title: 'Mathematics',
      //   description: 'Dummy Text',
      //   genreId: 3,
      //   enabled: true
      // },
      // {
      //   id: 2,
      //   title: 'History',
      //   description: 'Dummy Text',
      //   genreId: 1,
      //   enabled: true
      // },
      // {
      //   id: 3,
      //   title: 'Dance',
      //   description: 'Dummy Text',
      //   genreId: 2,
      //   enabled: true
      // }
    ]
   
    this.dataSource = new MatTableDataSource(this.topics);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
