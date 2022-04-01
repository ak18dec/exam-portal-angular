import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;

  userForm: FormGroup;

  newUser: User = {
    id: -1,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'ROLE_NORMAL',
    status: true
  };

  editableUser: User;
  addUser: boolean = false;
  dataLoaded: boolean = false;

  selectedUserId: number = -1;

  constructor(private fb: FormBuilder, private userService: UserService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    if(this.router.url.includes('/new')){
      this.addUser = true;
      this.initForm(this.newUser);
    }else{
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if(id){
          this.selectedUserId = id;
          this.getUserByUserId(id);
        }
      })
    }
  }

  initForm(user: User) {
    this.userForm = this.fb.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      email: [user.email],
      password: [user.password],
      username: [user.username],
      phone: [user.phone],
      role: [user.role],
      status: [user.status]
    })
  }

  getUserByUserId(userId: number){
    this.userService.getUserDetailsById(userId).subscribe(
      (res: any) => {
        if(this.selectedUserId === res.id){
          this.editableUser = res;
          this.editableUser.role = res.userRoles[0]?.roleName;
          this.editableUser.status = true;
          this.initForm(this.editableUser);
          this.dataLoaded = true;
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onFormSubmit(form: FormGroup){
    let formData = form.value;
    if(this.addUser){
      this.createUser(formData);
    }else{
      this.updateUser(formData);
    }
  }

  createUser(data: any) {
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
        this.userForm.reset();
      },
      (error) =>{
        console.log(error)
      }
    );
  }

  updateUser(updatedData: any){
    const editableUserId = this.editableUser.id;
    if(this.selectedUserId === editableUserId){
      this.editableUser = {
        id: editableUserId,
        username: updatedData.username,
        password: updatedData.password,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        phone: updatedData.phone,
        role: updatedData.role,
        status: updatedData.status
      }
  
      this.userService.updateUser(this.editableUser, this.selectedUserId).subscribe(
        (res: any)=> {
          // console.log(`User Details Updated Successfully for User ID ${editableUserId} and Selected User ID ${this.selectedUserId}`)
        },
        (error) => {
          console.log(error)
        }
      )
    }else{
      console.log('Users ID mismatched')
      console.log(this.selectedUserId)
      console.log(updatedData)
    }
    
  }

}
