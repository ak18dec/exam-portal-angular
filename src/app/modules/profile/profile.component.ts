import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;

  profileForm: FormGroup;

  emailPattern = "[A-Za-z0-9.'_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}";

  constructor(private userService: UserService, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    const currentUser = this.loginService.getUser();
    this.userService.getUserByUsername(currentUser.username).subscribe(
      (data) => {
        this.profile = data;
        this.createForm(this.profile);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  createForm(oldData: any) {
    this.profileForm = this.fb.group({
      username: [oldData.username, [Validators.required, Validators.maxLength(10)]],
      password: [oldData.password, [Validators.required]],
      firstName: [oldData.firstName, [Validators.required, Validators.maxLength(25)]],
      lastName: [oldData.lastName, [Validators.maxLength(25)]],
      email: [oldData.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [oldData.phone]
    });
  }

  reset() {
    this.profileForm.get('username')?.setValue(this.profile.username);
    this.profileForm.get('password')?.setValue(this.profile.password);
    this.profileForm.get('firstName')?.setValue(this.profile.firstName);
    this.profileForm.get('lastName')?.setValue(this.profile.lastName);
    this.profileForm.get('email')?.setValue(this.profile.email);
    this.profileForm.get('phone')?.setValue(this.profile.phone);
  }

  updateProfile(updatedForm: FormGroup) {
    let updatedUser: User = {
      id: 0,
      username : updatedForm.get('username')?.value,
      password : updatedForm.get('password')?.value,
      firstName : updatedForm.get('firstName')?.value,
      lastName : updatedForm.get('lastName')?.value,
      email : updatedForm.get('email')?.value,
      phone : updatedForm.get('phone')?.value,
      
    }

    this.userService.updateUser(updatedUser, this.profile.id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
