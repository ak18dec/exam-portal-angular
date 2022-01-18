import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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
    maxMarks: -1,
    maxTime: -1
  }
  proficiencyList: { id: number; level: string; }[];

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProficiencies();
    if(this.router.url.includes('/new')){
      this.addQuiz = true;
      this.initForm(this.newQuiz);
    }else{
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if(id){
          this.selectedQuizId = id;
          // this.getUserByUserId(id);
        }
      })
    }
  }

  getProficiencies(){
    this.proficiencyList = [
      {id: 1, level: 'Easy'},{id: 2, level: 'Medium'},{id: 3, level: 'Hard'}
    ]
  }

  initForm(quiz: Quiz) {
    // this.quizForm = this.fb.group({
    //   title: [quiz.title],
    //   description: [quiz.description], 
    //   questions: [quiz.questionIds],
    //   proficiency: [quiz.proficiencyId],
    //   published: [quiz.published],
    //   instructionEnabled: [quiz.instructionEnabled],
    //   instructions: [quiz.instructionIds],
    //   maxMarks: [quiz.maxMarks],
    //   maxTime: [quiz.maxTime]
    // })

    this.firstFormGroup = this.fb.group({
      title: [quiz.title],
      description: [quiz.description], 
      proficiency: [quiz.proficiencyId],
      maxMarks: [quiz.maxMarks],
      maxTime: [quiz.maxTime]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: [''],
    });
  }

  getQuizByQuizId(quizId: number){
    // this.userService.getUserDetailsById(userId).subscribe(
    //   (res: any) => {
    //     if(this.selectedUserId === res.id){
    //       this.editableUser = res;
    //       this.editableUser.role = 'basic';
    //       this.editableUser.status = true;
    //       this.initForm(this.editableUser);
    //       this.dataLoaded = true;
    //     }
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )
  }

  onFormSubmit(form: FormGroup){
    let formData = form.value;
    
  }

}
