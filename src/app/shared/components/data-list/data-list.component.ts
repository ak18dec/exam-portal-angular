import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  data: any[] = [];
  dataLoaded: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private quizService: QuizService
    ) { }

  ngOnInit(): void {
    this.getAllQuizes();
  }

  getAllQuizes(){
    this.data = this.quizService.getQuizesFromCache();
    if(this.data.length < 1) {
      this.quizService.getQuizes().subscribe(
        (res: any) =>{
          this.data = res;
          console.log(res)
          this.quizService.storeQuizesInCache(this.data);
          this.dataLoaded = true;
        },
        (error) => {
          console.log(error)
        }
        )
    }
  }

  

}
