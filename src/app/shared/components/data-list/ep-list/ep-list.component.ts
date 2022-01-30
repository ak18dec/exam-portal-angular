import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, startWith } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ep-list',
  templateUrl: './ep-list.component.html',
  styleUrls: ['./ep-list.component.scss']
})
export class EpListComponent implements OnInit {

  search = new FormControl();

  @Input() data: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  $search = this.search.valueChanges.pipe(
    startWith(null),
    debounceTime(200),
    switchMap((res: string) => {
      if (!res) return of(this.data);
      res = res.trim().toLowerCase();
      return of(
        this.data.filter(x => x.title.toLowerCase().indexOf(res) >= 0)
      );
    })
  );

  startQuiz(quizId: number) {
    this.router.navigate([`/user/quiz/${quizId}/instructions`]);
  }

}
