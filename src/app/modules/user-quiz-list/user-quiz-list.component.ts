import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { debounceTime, switchMap, startWith } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
@Component({
  selector: 'app-user-quiz-list',
  templateUrl: './user-quiz-list.component.html',
  styleUrls: ['./user-quiz-list.component.scss'],
  standalone: false,
})
export class UserQuizListComponent implements OnInit {
  categoryService = inject(CategoryService);
  quizService = inject(QuizService);
  questionService = inject(QuestionService);
  private router = inject(Router);

  categories: Category[] = [];
  quizForm = new FormGroup({
    noOfQues: new FormControl(),
    categoryId: new FormControl(0),
    difficulty: new FormControl(),
    type: new FormControl(),
  });

  questions: Question[] = [];

  // search = new UntypedFormControl();
  // data: any[] = [];
  // dataLoaded: boolean = false;

  // constructor(private router: Router) {
  //   console.log(this.router.config)
  //  }

  ngOnInit(): void {
    // this.getAllQuizes();
    this.categories = this.categoryService.getCategories();
  }

  // filteredList$ = this.search.valueChanges.pipe(
  //   startWith(null),
  //   debounceTime(200),
  //   switchMap((res: string) => {
  //     if (!res) return of(this.data);
  //     res = res.trim().toLowerCase();
  //     return of(
  //       this.data.filter(x => x.title.toLowerCase().indexOf(res) >= 0)
  //     );
  //   })
  // );

  // startQuiz(quizId: number) {
  //   this.router.navigate([`/user/quiz/${quizId}`]);
  // }

  // getAllQuizes(){
  //   this.data = this.quizService.getQuizesFromCache();
  //   if(this.data.length < 1) {
  //     this.quizService.getQuizes().subscribe(
  //       (res: any) =>{
  //         this.data = res;
  //         this.quizService.storeQuizesInCache(this.data);
  //         this.dataLoaded = true;
  //         this.search.setValue('');
  //       },
  //       (error) => {
  //         console.log(error)
  //       }
  //       )
  //   }
  // }

  validateParams(): boolean {
    const form: any = this.quizForm.value;
    for (let key in form) {
      if (
        form[key] === null ||
        form[key] === undefined ||
        form[key] === '' ||
        (typeof form[key] === 'string' && form[key].trim() === '')
      ) {
        return false; // One or more properties are empty
      }
    }
    return true; // All properties have values
  }
  generateQuiz() {
    this.quizService.generateQuiz(this.quizForm.value).subscribe({
      next: (res: any) => {
        if (res && res.results) {
          this.questions = res.results;
          this.questionService.questions.set([...this.questions])
          this.router.navigate(['/user/quiz']);
        }
        this.quizForm.reset();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
