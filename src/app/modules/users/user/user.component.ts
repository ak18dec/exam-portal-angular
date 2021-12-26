import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;

  newUserForm: FormGroup;

  newUser: User;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      username: [''],
      phone: [''],
      role: ['basic'],
      status: [true]
    })
  }

  createUser(form: FormGroup) {
    let data = form.value;

    this.newUser = {
      id: -1,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status
    }

    this.userService.registerUser(this.newUser).subscribe(
      (res: any)  => {
        this.newUserForm.reset();
      },
      (error) =>{
        console.log(error)
      }
    );
  }

}
