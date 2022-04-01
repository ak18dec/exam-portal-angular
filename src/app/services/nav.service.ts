import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  toggleOpenIcon: boolean = false;

  constructor() { }

  close() {
    this.toggleOpenIcon = false;
  }
}
