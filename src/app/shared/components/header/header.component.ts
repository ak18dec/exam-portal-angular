import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() showToggleOption: boolean = false;
  @Input() isMobileDevice: boolean = false;

  constructor(
    public loginService: LoginService, 
    private router: Router,
    public navService: NavService
    ) { }

  ngOnInit(): void {}

  toggleSideBar() {
    this.navService.toggleOpenIcon = !this.navService.toggleOpenIcon;
  }

  public logout(){
    this.loginService.logout();
    this.loginService.loginStatusSubject.next(true);
    this.router.navigate(['/']);
  }

  account() {
    if(this.loginService.getUserRole() === 'ROLE_ADMIN'){
      this.router.navigate(['/admin/profile'])
    }else if(this.loginService.getUserRole() === 'ROLE_NORMAL'){
      this.router.navigate(['/user/profile'])
    }else {
      this.loginService.logout();
      this.router.navigate(['login']);
    }
  }

}
