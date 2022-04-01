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

  quizPublished: boolean = false;

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
      this.dataLoaded = true;
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
    this.quizPublished = quiz.published;
  }

  getQuizByQuizId(quizId: number){
    this.quizService.getQuizById(quizId).subscribe(
      (res: any) => {
        if(this.selectedQuizId === res.id){
          this.editableQuiz = res;
          this.initForm(this.editableQuiz);
          this.dataLoaded = true;
          if(this.editableQuiz.instructionEnabled){
            this.instructionsLoaded = true;
            this.getAllInstructions();
          }
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
    if(this.addQuiz) {
      this.createQuiz(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value)
    }else{
      // console.log('Edit Quiz Called')
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      // console.log(this.thirdFormGroup.value)
      // console.log(this.quizPublished)
      this.updateQuiz(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value)
    }
  }

  instructionToggle(event: MatSlideToggleChange) {
    this.enableInstruction = event.checked;
    this.instructionsLoaded = !this.instructionsLoaded;
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

  createQuiz(form1Data: any, form2Data: any, form3Data: any){
    this.newQuiz = {
      id: -1,
      title: form1Data.title,
      description: form1Data.description, 
      maxMarks: form1Data.maxMarks,
      maxTime: form1Data.maxTime,
      proficiencyId: form1Data.proficiency,
      questionIds: form2Data.questions,
      instructionEnabled: form3Data.instructionEnabled,
      instructionIds: form3Data.instructions,
      published: this.quizPublished,
    }

    // console.log('On Submit of New Quiz: ')
    // console.log(this.newQuiz)

    this.quizService.addQuiz(this.newQuiz).subscribe(
      (res: any)  => {
        this.formReset();
      },
      (error) =>{
        console.log(error)
      }
    );
  }

  formReset() {
    this.quizPublished = false;
    this.loadQuestions = false;
    this.newQuiz = {
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
    this.newQuiz.proficiencyId = this.proficiencyList[0].id;
    this.initForm(this.newQuiz);
  }

  moveToInstructionsPage() {
    if(!this.instructionsLoaded){
      this.getAllInstructions();
    }
  }

  updateQuiz(form1Data: any, form2Data: any, form3Data: any){
    const editableQuizId = this.editableQuiz.id;
    if(this.selectedQuizId === editableQuizId){
      this.editableQuiz = {
        id: editableQuizId,
        title: form1Data.title,
        description: form1Data.description, 
        maxMarks: form1Data.maxMarks,
        maxTime: form1Data.maxTime,
        proficiencyId: form1Data.proficiency,
        questionIds: form2Data.questions,
        instructionEnabled: form3Data.instructionEnabled,
        instructionIds: form3Data.instructions,
        published: this.quizPublished,
      }

      // console.log('Before hitting update quiz')
      // console.log(this.editableQuiz)
      this.quizService.updateQuiz(this.editableQuiz, this.selectedQuizId).subscribe(
        (res: any)=> {
          // console.log(`Quiz Details Updated Successfully for Quiz ID ${editableQuizId} and Selected Quiz ID ${this.selectedQuizId}`)
        },
        (error) => {
          console.log(error)
        }
      );
    }else{
      console.log('Quiz ID mismatched')
      console.log(this.selectedQuizId)
      console.log(form1Data)
      console.log(form2Data)
      console.log(form3Data)
    }

  }

}
