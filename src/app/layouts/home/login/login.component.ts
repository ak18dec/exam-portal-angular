import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  hide = true;
  form: UntypedFormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.form = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    try {
      const usernameOrEmail = this.form.get('usernameOrEmail')?.value;
      const password = this.form.get('password')?.value;

      if (!usernameOrEmail && !password) {
        this.notifierService.showNotification('Please provide credentials', '', 'error', false);
        return;
      }

      if (!usernameOrEmail) {
        this.notifierService.showNotification('Username is required', '', 'error', false);
        return;
      }

      if (!password) {
        this.notifierService.showNotification('Password is required', '', 'error', false);
        return;
      }

      const loginData = {
        usernameOrEmail: usernameOrEmail,
        password: password
      }

      // request to server to generate token
      this.loginService.generateToken(loginData).subscribe(
        (data: any) => {
          this.loginService.storeToken(data.token);
          this.userService.getUserByUsernameOrEmail(loginData.usernameOrEmail).subscribe(
            (user: any) => {
              this.loginService.storeUser(user);
              //redirect .... ADMIN: admin-dashboard redirect ....NORMAL: user-dashboard
              if (this.loginService.getUserRole() === 'ROLE_ADMIN') {

                //admin dashboard
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);

              } else if (this.loginService.getUserRole() === 'ROLE_NORMAL') {

                //basic user dashboard
                this.router.navigate(['user']);
                this.loginService.loginStatusSubject.next(true);

              } else {
                this.loginService.logout();
              }

            },
            (error) => {
              this.notifierService.showNotification('Error while fetching current user', '', 'error', false);
            }

          );
        },
        (error) => {
          this.notifierService.showNotification('Invalid Credentials', '', 'error', false);
        }
      );

    } catch (err) {
      this.notifierService.showNotification('Invalid Credentials', '', 'error', false);
    }
  }

  loginGuestUser() {
    this.form.get('usernameOrEmail')?.setValue('basic@examportal.com');
    this.form.get('password')?.setValue('basic');
    this.onSubmit();
  }

}
