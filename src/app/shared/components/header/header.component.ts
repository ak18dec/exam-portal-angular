import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit()
  }

  public logout(){
    console.log('logout clicked');
    this.loginService.logout();
    this.loginService.loginStatusSubject.next(true);
    this.router.navigate(['/']);
  }

  account() {
    console.log('my account clicked')
    this.router.navigate(['/admin/profile'])
  }

}
