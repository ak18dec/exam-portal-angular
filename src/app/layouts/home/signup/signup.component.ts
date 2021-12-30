import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  checked = false;

  hide = true;

  // signupForm: FormGroup;

  // emailPattern = "[A-Za-z0-9.'_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"

  // constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private userService: UserService) { }

  // user: User;

  // ngOnInit() {
  //   this.createForm();
  // }


  // createForm() {
  //   this.signupForm = this.fb.group({
  //     username: ['', [Validators.required, Validators.maxLength(10)]],
  //     password: ['', [Validators.required]],
  //     firstName: ['', [Validators.required, Validators.maxLength(25)]],
  //     lastName: ['', [Validators.maxLength(25)]],
  //     email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  //     phone: ['']
  //   });
  // }

  // reset() {
  //   this.signupForm.reset();
  // }

  // register() {

  //   if (!this.validateForm(this.signupForm)) {
  //     return;
  //   }

  //   this.user = this.signupForm.value;

  //   console.log(this.user)

  //   this.userService.registerUser(this.user).subscribe(
  //     (data) => {
  //       Swal.fire('Success !!!', 'User is registered successfully','success')
  //       this.reset();
  //     },
  //     (error) => {
  //       console.log(error);
  //       this._snackBar.open(JSON.stringify(error), '',{
  //         duration: 3000
  //       })
  //     }
  //   )
  // }

  // validateForm(form: any): boolean {

  //   if (this.signupForm.invalid) {
  //     let content = this.signupForm.value;
  //     let invalidUsernameMsg = this.isUsernameValid(content.username);
  //     let invalidPasswordMsg = this.isPasswordValid(content.password);
  //     let invalidFirstNameMsg = this.isFirstNameValid(content.firstName);
  //     let invalidEmailMsg = this.isEmailValid(content.email);

  //     let uniqueData = true; //!this.isduplicateData(content);

  //     let snacks = '';

  //     if(invalidUsernameMsg) {
  //       snacks = snacks.concat(invalidUsernameMsg)
  //     }
  //     if(invalidPasswordMsg){
  //       snacks = snacks.concat('\n').concat(invalidPasswordMsg)
  //     }
  //     if(invalidFirstNameMsg){
  //       snacks = snacks.concat('\n').concat(invalidFirstNameMsg)
  //     }
  //     if(invalidEmailMsg){
  //       snacks = snacks.concat('\n').concat(invalidEmailMsg);
  //     }

  //     this._snackBar.open(`${invalidUsernameMsg}\n${invalidPasswordMsg}\n${invalidFirstNameMsg}\n${invalidEmailMsg}`, '', {
  //         duration: 3000,
  //         panelClass: ['error-snackbar']
  //     })

  //     // return validUserName && validPassword && validFirstName && validEmail && uniqueData;
  //     return false;

  //   }
  //   return true;
  // }


  // isUsernameValid(username: string) {

  //   if (username) {
  //     username = username.trim();
  //   }

  //   if (!username || username.length < 1) {
  //     return 'Username is required!!';
  //   } else {
  //     if (username.length > 10) {
  //       return 'Username is too long!!, max length is 10 characters';
  //     }

  //     if (this.isduplicateUserName(username)) {
  //       return 'This username is already taken';
  //     }

  //   }
  //   return null;
  // }

  // isPasswordValid(password: string) {

  //   if (password) {
  //     password = password.trim();
  //   }

  //   if (!password || password.length < 1) {
  //     return 'Password is required!!';
  //   }

  //   return null;
  // }

  // isFirstNameValid(firstname: string) {

  //   if (firstname) {
  //     firstname = firstname.trim();
  //   }

  //   if (!firstname || firstname.length < 1) {
  //     return 'Firstname is required!!';
  //   } else {
  //     if (firstname.length > 25) {
  //       return 'Firstname is too long!!, max length is 25 characters';
  //     }
  //   }
  //   return null;

  // }

  // isEmailValid(email: string) {
  //   if (email) {
  //     email = email.trim();
  //   }

  //   if (!email || email.length < 1) {
  //     return 'Email is required!!';
  //   }
  //   return null;

  // }

  // isduplicateUserName(username: string): boolean {
  //   return false;
  // }

  // isduplicateData(data: any): string[] {
  //   let message: string[] = [];
  //   this.userService.duplicateDataCheck(data).subscribe((resp: any) => {
  //     message = resp.data
  //   });
  //   return message;
  // }

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
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
