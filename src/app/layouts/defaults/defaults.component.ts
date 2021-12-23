import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defaults',
  templateUrl: './defaults.component.html',
  styleUrls: ['./defaults.component.scss']
})
export class DefaultsComponent implements OnInit {

  sideBarOpen = false;

  constructor() { }

  ngOnInit(): void {}

  sideBarToggler(event: any){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
