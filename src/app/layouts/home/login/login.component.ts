import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  // loginData:any = {
  //   username: '',
  //   password: ''
  // }

  // constructor(private _snackBar: MatSnackBar, private loginService: LoginService, private router: Router, private userService: UserService) { }

  // ngOnInit() {
  //   this.loginData.username = '';
  //   this.loginData.password = '';
  // }

  // login(logForm: any) {

  //   if(!this.loginData.username && !this.loginData.password){
  //     this._snackBar.open('Please provide credentials','',{
  //       duration: 3000
  //     });
  //     return;
  //   }

  //   if(!this.loginData.username){
  //     this._snackBar.open('Username is required','',{
  //       duration: 3000
  //     });
  //     return;
  //   }

  //   if(!this.loginData.password){
  //     this._snackBar.open('Password is required','',{
  //       duration:3000
  //     });
  //     return;
  //   }

  //   // request to server to generate token
  //   this.loginService.generateToken(this.loginData).subscribe(
  //     (data: any)=>{
  //       this.loginService.storeToken(data.token);
  //       this.userService.getUserByUsername(this.loginData.username).subscribe(
  //         (user: any) => {
  //           this.loginService.storeUser(user);
  //           console.log(user);
  //           //redirect .... ADMIN: admin-dashboard
  //           //redirect ....NORMAL: user-dashboard
  //           if(this.loginService.getUserRole() === 'ADMIN'){

  //             //admin dashboard
  //             this.router.navigate(['admin']);
  //             this.loginService.loginStatusSubject.next(true);

  //           }else if (this.loginService.getUserRole() === 'BASIC'){
              
  //             //basic user dashboard
  //             this.router.navigate(['user-dashboard']);
  //             this.loginService.loginStatusSubject.next(true);
            
  //           }else{
  //             this.loginService.logout();
  //           }
            
  //         },
  //         (error)=>{
  //           this._snackBar.open('Error while fetching current user !!!','', {
  //             duration: 3000
  //           })
  //         }
  //       );
  //     },
  //     (error)=>{
  //       console.log(`error data ${error}`);
  //       this._snackBar.open('Invalid Credentials !!!','', {
  //         duration: 3000
  //       })
  //     }
  //   );
  // }


  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authService: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        // await this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
