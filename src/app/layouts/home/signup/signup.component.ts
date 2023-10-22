import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  checked = false;
  hide = true;
  emailPattern = "[A-Za-z0-9.'_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
  user: User;
  form: FormGroup;
  public loginInvalid = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  isPasswordValid(password: string): boolean {
    if (password) {
      password = password.trim();
    }
    if (!password || password.length < 1) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.user = this.form.value;
    this.user.role = 'ROLE_NORMAL';

    if(!this.user.email && !this.user.password){
      this.notifierService.showNotification('Please provide proper details to create the user', '', 'error', false);
      return;
    }

    if(this.form.get('email')?.errors){
      this.notifierService.showNotification('Please provide valid email address', '', 'error', false);
      return;
    }

    if(!this.isPasswordValid(this.user.password)){
      this.notifierService.showNotification('Please provide valid password', '', 'error', false);
      return;
    }

    this.userService.registerUser(this.user).subscribe(
      (data) => {
        Swal.fire('Success !!!', 'User is registered successfully', 'success')
        this.reset();
      },
      (error) => {
        this.notifierService.showNotification(JSON.stringify(error),'','error',false);
      }
    )
  }


  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]],
    });
  }

  reset() {
    this.form.reset();
  }
}
