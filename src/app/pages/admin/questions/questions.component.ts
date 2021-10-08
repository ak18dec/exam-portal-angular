import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  newQuestion: boolean = false;

  addBtnClicked: boolean = false;
  questions: Question[] = [];
  proficiencyList: Proficiency[] = [];
  topicsList: any[] = [{id: 1, title: 'Algebra'}, {id: 2, title: 'Geometry'},{id: 3, title: 'Calculus'}];

  newQuestionData: Question = {
    id: 0,
    title: '',
    content: '',
    topicId: 0,
    enabled: true,
    proficiencyId: 0,
    quesChoices:[]
  }


  newQuestionChoices: QuestionChoice[] = [
    {id: 0, content: '', enabled: true, correct: false, questionId: 0},
    {id: 0, content: '', enabled: true, correct: false, questionId: 0},
    {id: 0, content: '', enabled: true, correct: false, questionId: 0},
    {id: 0, content: '', enabled: true, correct: false, questionId: 0}
  ];

  constructor() { }

  ngOnInit() {
    this.freshForm();
    this.getProficiencies();
  }

  getProficiencies(){
    this.proficiencyList = [
      {id: 1, level: 'Easy'},{id: 2, level: 'Medium'},{id: 3, level: 'Hard'}
    ]
  }

  getQuestions() {

  }

  getQuestionProficiency(pid: number){
    return this.proficiencyList.find(p => p.id === pid);
  }

  freshForm(){
    this.newQuestion = false;
    this.addBtnClicked = false;
    this.newQuestionData.title = '';
    this.newQuestionData.id = 0
    this.newQuestionData.content = '';
    this.newQuestionData.topicId = 0;
    this.newQuestionData.proficiencyId = 0;
    this.newQuestionData.enabled = true;
  }

  backToQuestions(){
    this.freshForm();
  }

  addQuestion() {
    this.freshForm();
    this.newQuestion = true;
    this.addBtnClicked = true;
  }

  editQuestion(editableQuestion: Question){
    this.newQuestion = true;
    this.addBtnClicked = false;
    this.newQuestionData.title = editableQuestion.title;
    this.newQuestionData.content = editableQuestion.content;
    this.newQuestionData.id = editableQuestion.id;
    this.newQuestionData.enabled = editableQuestion.enabled;
    this.newQuestionData.topicId = editableQuestion.topicId;
    this.newQuestionData.proficiencyId = editableQuestion.proficiencyId;
  }

  deleteQuestion(id: number){

  }

  toggleQuestionStatus() {

  }

  submitForm(questionForm) {

    console.log(this.newQuestionChoices)

  }


}
