import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proficiency } from 'src/app/models/proficiency';
import { Question } from 'src/app/models/question';
import { QuestionChoice } from 'src/app/models/questionchoice';
import { QuestionService } from 'src/app/services/question.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
    standalone: false
})
export class QuestionComponent implements OnInit {

  // public Editor = ClassicEditor;
  public data: string = '<p>Enter question content here</p>';

  question: Question = {
    id: -1,
    description: '',
    enabled: true,
    proficiency: '',
    questionChoices:[]
  }

  proficiencyList: Proficiency[] = [];

  choices: QuestionChoice[] = [
    {id: -1, description: '', enabled: true, correct: false, questionId: -1},
    {id: -1, description: '', enabled: true, correct: false, questionId: -1},
    {id: -1, description: '', enabled: true, correct: false, questionId: -1},
    {id: -1, description: '', enabled: true, correct: false, questionId: -1}
  ];

  editableQuestion: Question;
  addQuestion: boolean = false;
  dataLoaded: boolean = false;

  selectedQuestionId: number = -1;

  constructor(
    private questionService: QuestionService, 
    private route : ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
    this.getProficiencies();
    if(this.router.url.includes('/new')){
      this.addQuestion = true;
    }else{
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if(id){
          this.selectedQuestionId = id;
          this.getQuestionById(id);
        }
      })
    }
  }

  getProficiencies(){
    this.proficiencyList = [
      {level: 'Easy'},{level: 'Medium'},{level: 'Hard'}
    ]
  }

  resetForm(){
    this.question = {
      id: -1,
      description: '',
      enabled: true,
      proficiency: '',
      questionChoices:[]
    }
  
    this.choices = [
      {id: -1, description: '', enabled: true, correct: false, questionId: -1},
      {id: -1, description: '', enabled: true, correct: false, questionId: -1},
      {id: -1, description: '', enabled: true, correct: false, questionId: -1},
      {id: -1, description: '', enabled: true, correct: false, questionId: -1}
    ];
  }

  createQuestion(){
    this.question.questionChoices = this.choices;
    this.questionService.addQuestion(this.question).subscribe(
      (data)=>{
        // this._snackBar.open(`${this.newQuestionData.title} is added successfully to list`,'',{
        //   duration: 3000
        // });
        this.resetForm();
        
      },
      (error)=>{
        // this._snackBar.open(JSON.stringify(error),'',{
        //   duration: 3000
        // });
        console.log(error)
      }
    )
  }

  selectCorrectOption(optionId: number){
    this.choices.forEach(ch => ch.correct = false);
    this.choices[optionId].correct = true;
  }

  getQuestionById(quesId: number){
    this.questionService.getQuestionById(quesId).subscribe(
      (res: any) => {
        if(this.selectedQuestionId === res.id){
          this.editableQuestion = res;
          this.initForm(this.editableQuestion);
          this.dataLoaded = true;
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  initForm(ques: Question) {
    this.question = {
      id: ques.id,
      description: ques.description,
      enabled: ques.enabled,
      proficiency: ques.proficiency,
      questionChoices: Object.assign([], ques.questionChoices)
    }
    this.choices = Object.assign([], ques.questionChoices)
  }

  onFormSubmit(form: NgForm){
    if(this.addQuestion){
      this.createQuestion();
    }else{
      this.updateQuestion(this.question, this.choices);
    }
  }

  updateQuestion(updatedData: Question, updatedChoices: QuestionChoice[]){
    const editableQuesId = this.editableQuestion.id;
    if(this.selectedQuestionId === editableQuesId){
      const updatedQues: Question = {
        id: editableQuesId,
        description: updatedData.description,
        enabled: updatedData.enabled,
        proficiency: updatedData.proficiency,
        questionChoices: updatedChoices
      }

      this.questionService.updateQuestion(updatedQues, this.selectedQuestionId).subscribe(
        (res: any)=> {
          // console.log(`Question Details Updated Successfully for Ques ID ${editableQuesId} and Selected Ques ID ${this.selectedQuestionId}`)
        },
        (error) => {
          console.log(error)
        }
      )
    }else{
      console.log('Ques ID mismatched')
      console.log(this.selectedQuestionId)
      console.log(updatedData)
    }
    
  }
}
