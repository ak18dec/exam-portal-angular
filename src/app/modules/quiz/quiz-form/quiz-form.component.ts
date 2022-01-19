import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { Instruction } from 'src/app/models/instruction';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { InstructionService } from 'src/app/services/instruction.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  quizForm: FormGroup;
  editableQuiz: Quiz;
  addQuiz: boolean = false;
  dataLoaded: boolean = false;

  selectedQuizId: number = -1;

  newQuiz: Quiz = {
    id: -1,
    title: '',
    description: '', 
    questionIds: [],
    proficiencyId: -1,
    published: false,
    instructionEnabled: false,
    instructionIds: [],
    maxMarks: 0,
    maxTime: 0
  }
  proficiencyList: { id: number; level: string; }[];

  questions: Question[]=[];
  loadQuestions: boolean = false;
  instructions: Instruction[]=[];
  instructionsLoaded: boolean = false;

  selectedQuestions: number[] = [];
  enableInstruction: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private route : ActivatedRoute, 
    private router: Router,
    private questionService: QuestionService,
    private quizService: QuizService,
    private instructionService: InstructionService
    ) { }

  ngOnInit() {
    this.getProficiencies();
    if(this.router.url.includes('/new')){
      this.addQuiz = true;
      this.newQuiz.proficiencyId = this.proficiencyList[0].id;
      this.initForm(this.newQuiz);
    }else{
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if(id){
          this.selectedQuizId = id;
          this.getQuizByQuizId(id);
        }
      })
    }
  }

  get thirdFromGroup() {
    return this.thirdFormGroup.controls;
  }

  getProficiencies(){
    this.proficiencyList = [
      {id: 1, level: 'Easy'},{id: 2, level: 'Medium'},{id: 3, level: 'Hard'}
    ]
    
  }

  initForm(quiz: Quiz) {
    this.firstFormGroup = this.fb.group({
      title: [quiz.title],
      description: [quiz.description], 
      proficiency: [quiz.proficiencyId],
      maxMarks: [quiz.maxMarks],
      maxTime: [quiz.maxTime]
    });
    this.secondFormGroup = this.fb.group({
      questions: [quiz.questionIds]
    });
    this.thirdFormGroup = this.fb.group({
      instructionEnabled: [quiz.instructionEnabled],
      instructions: [quiz.instructionIds]
    });
  }

  getQuizByQuizId(quizId: number){
    this.quizService.getQuizById(quizId).subscribe(
      (res: any) => {
        if(this.selectedQuizId === res.id){
          this.editableQuiz = res;
          this.initForm(this.editableQuiz);
          this.dataLoaded = true;
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getAllQuestions() {
    this.questionService.getQuestions().subscribe(
      (res: any) => {
        this.questions = res;
        this.loadQuestions = true;
      },
      (error) => {
        // this._snackBar.open('Error while fetching questions list','',{
        //   duration: 3000
        // });
        console.log(error);
      }
    )
  }

  submitQuiz() {
    console.log(this.firstFormGroup.value)
    console.log(this.secondFormGroup.value)
    console.log(this.thirdFormGroup.value)
  }

  instructionToggle(event: MatSlideToggleChange) {
    this.enableInstruction = event.checked;
    if(this.enableInstruction && this.instructions.length < 1){ 
      this.getAllInstructions();
    }
  }

  getAllInstructions() {
    this.instructionService.getInstructions().subscribe(
      (res: any) => {
        this.instructions = res;
        this.instructionsLoaded = true;
      },
      (error) => {
        // this._snackBar.open('Error while fetching questions list','',{
        //   duration: 3000
        // });
        console.log(error);
      } 
    )
  }

  onInstructionSelection(){
    // console.log(this.thirdFormGroup.value.instructions);
  }

  questionToggle() {
    this.loadQuestions = !this.loadQuestions;
    if(this.loadQuestions && this.questions.length < 1){
      this.getAllQuestions();
    }
  }

  moveToQuestionsPage() {
    if(!this.loadQuestions){
      this.getAllQuestions();
    }
  }

}
