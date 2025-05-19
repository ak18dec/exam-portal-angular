import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
    selector: 'app-quiz-form',
    templateUrl: './quiz-form.component.html',
    styleUrls: ['./quiz-form.component.scss'],
    standalone: false
})
export class QuizFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  quizForm: UntypedFormGroup;
  editableQuiz: Quiz;
  addQuiz: boolean = false;
  dataLoaded: boolean = false;

  selectedQuizId: number = -1;

  newQuiz: Quiz = {
    id: -1,
    title: '',
    description: '', 
    questionIds: [],
    published: false,
    maxMarks: 0,
    maxTime: 0
  }

  questions: Question[]=[];
  loadQuestions: boolean = false;
  selectedQuestions: number[] = [];
  quizPublished: boolean = false;

  constructor(
    private fb: UntypedFormBuilder, 
    private route : ActivatedRoute, 
    private router: Router,
    private questionService: QuestionService,
    private quizService: QuizService
    ) { }

  ngOnInit() {
    if(this.router.url.includes('/new')){
      this.addQuiz = true;
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

  initForm(quiz: Quiz) {
    this.firstFormGroup = this.fb.group({
      title: [quiz.title],
      description: [quiz.description], 
      maxMarks: [quiz.maxMarks],
      maxTime: [quiz.maxTime]
    });
    this.secondFormGroup = this.fb.group({
      questions: [quiz.questionIds]
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
      this.createQuiz(this.firstFormGroup.value, this.secondFormGroup.value)
    }else{
      // console.log('Edit Quiz Called')
      // console.log(this.firstFormGroup.value)
      // console.log(this.secondFormGroup.value)
      // console.log(this.quizPublished)
      this.updateQuiz(this.firstFormGroup.value, this.secondFormGroup.value)
    }
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

  createQuiz(form1Data: any, form2Data: any){
    this.newQuiz = {
      id: -1,
      title: form1Data.title,
      description: form1Data.description, 
      maxMarks: form1Data.maxMarks,
      maxTime: form1Data.maxTime,
      questionIds: form2Data.questions,
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
      published: false,
      maxMarks: 0,
      maxTime: 0
    }
    this.initForm(this.newQuiz);
  }

  updateQuiz(form1Data: any, form2Data: any){
    const editableQuizId = this.editableQuiz.id;
    if(this.selectedQuizId === editableQuizId){
      this.editableQuiz = {
        id: editableQuizId,
        title: form1Data.title,
        description: form1Data.description, 
        maxMarks: form1Data.maxMarks,
        maxTime: form1Data.maxTime,
        questionIds: form2Data.questions,
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
    }

  }

}
