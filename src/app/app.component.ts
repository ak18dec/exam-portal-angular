import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit{
  title = 'Exam Portal';

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;
        if(child?.snapshot.data['title']){
          return appTitle.concat(' | ').concat(child.snapshot.data['title']);
        }
        return appTitle;
      })
    ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);  
    });
  }
}
