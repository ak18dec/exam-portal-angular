import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData:any = {
    username: '',
    password: ''
  }

  constructor(private _snackBar: MatSnackBar, private loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.loginData.username = '';
    this.loginData.password = '';
  }

  login(logForm: any) {

    if(!this.loginData.username && !this.loginData.password){
      this._snackBar.open('Please provide credentials','',{
        duration: 3000
      });
      return;
    }

    if(!this.loginData.username){
      this._snackBar.open('Username is required','',{
        duration: 3000
      });
      return;
    }

    if(!this.loginData.password){
      this._snackBar.open('Password is required','',{
        duration:3000
      });
      return;
    }

    // request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any)=>{
        this.loginService.storeToken(data.token);
        this.userService.getUserByUsername(this.loginData.username).subscribe(
          (user: any) => {
            this.loginService.storeUser(user);
            console.log(user);
            //redirect .... ADMIN: admin-dashboard
            //redirect ....NORMAL: user-dashboard
            if(this.loginService.getUserRole() === 'ADMIN'){

              //admin dashboard
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);

            }else if (this.loginService.getUserRole() === 'BASIC'){
              
              //basic user dashboard
              this.router.navigate(['user-dashboard']);
              this.loginService.loginStatusSubject.next(true);
            
            }else{
              this.loginService.logout();
            }
            
          },
          (error)=>{
            this._snackBar.open('Error while fetching current user !!!','', {
              duration: 3000
            })
          }
        );
      },
      (error)=>{
        console.log(`error data ${error}`);
        this._snackBar.open('Invalid Credentials !!!','', {
          duration: 3000
        })
      }
    );
  }

}
