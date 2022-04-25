import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-dialog',
  templateUrl: './guest-dialog.component.html',
  styleUrls: ['./guest-dialog.component.scss']
})
export class GuestDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guestAdminLogin() {
    console.info('admin login')
  }

  guestUserLogin() {
    console.info('user login')
  }

}
