import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLoggedIn: boolean = false;
  currentUser: any = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.loginStatusSubject.subscribe(
      data=>{
        this.userLoggedIn = this.loginService.isLoggedIn();
        this.currentUser = this.loginService.getUser();
    });
  }

  public logout(){
    this.loginService.logout();
    this.userLoggedIn = false;
    this.currentUser = null;
    this.loginService.loginStatusSubject.next(true);
    this.router.navigate(['']);
  }

}
