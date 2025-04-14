import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-back',
    templateUrl: './back.component.html',
    styleUrls: ['./back.component.scss'],
    standalone: false
})
export class BackComponent implements OnInit {

  @Input() path = '';
  @Input() label = '';

  constructor() { }

  ngOnInit(): void {
  }

}
