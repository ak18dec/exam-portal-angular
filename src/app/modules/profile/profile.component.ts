import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { FileService } from 'src/app/services/file.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { HttpEventType } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  hide = true;

  profile: any;

  profileForm: FormGroup;

  emailPattern = "[A-Za-z0-9.'_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}";

  fullName: string = '';
  email: string = '';
  profilePicUrl: string= '';

  selectedFile:File;
  timer: number = 0;
  success: boolean = false;
  role: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private userService: UserService, 
    private fb: FormBuilder, 
    private loginService: LoginService,
    private fileService: FileService,
    private breakpointObserver: BreakpointObserver
    ) { }

  // ngOnInit() {
  //   const currentUser = this.loginService.getUser();
  //   this.userService.getUserByUsername(currentUser.username).subscribe(
  //     (data) => {
  //       this.profile = data;
  //       this.createForm(this.profile);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // }

  createForm(oldData: any) {
    this.profileForm = this.fb.group({
      username: [oldData.username, [Validators.required, Validators.maxLength(10)]],
      password: [oldData.password, [Validators.required]],
      firstName: [oldData.firstName, [Validators.required, Validators.maxLength(25)]],
      lastName: [oldData.lastName, [Validators.maxLength(25)]],
      email: [oldData.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [oldData.phone],
      role: [{value: this.role, disabled: true}],
      profilePic: [this.profilePicUrl]
    });
  }

  reset() {
    this.profileForm.get('username')?.setValue(this.profile.username);
    this.profileForm.get('password')?.setValue(this.profile.password);
    this.profileForm.get('firstName')?.setValue(this.profile.firstName);
    this.profileForm.get('lastName')?.setValue(this.profile.lastName);
    this.profileForm.get('email')?.setValue(this.profile.email);
    this.profileForm.get('phone')?.setValue(this.profile.phone);
    this.profileForm.get('role')?.setValue(this.role)
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




  ngOnInit(): void {
    const currentUser = this.loginService.getUser();
    this.fullName = `${currentUser.firstName} ${currentUser.lastName}`;
    this.email = currentUser.email;
    this.profilePicUrl = 'https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png';
    this.userService.getUserByUsername(currentUser.username).subscribe(
      (data) => {
        this.profile = data;
        if(this.profile.userRoles[0].roleName){
          this.role = this.profile.userRoles[0].roleName === 'ROLE_ADMIN' ? 'ADMIN' : 'USER';
        }
        this.createForm(this.profile);
        console.log(this.profile)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  uploadProfilePic() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.fileService.uploadImage(fd).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        // @ts-ignore: Object is possibly 'null'.
        const progress = Math.round((event.loaded/event.total)*100);
        console.log(`Upload Progress: ${progress} %`)
      }else if(event.type === HttpEventType.Response){
        console.log(event);
      }
    })
  }

  onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
    this.success = true;
    this.startTimer();
  }

  startTimer() {
    let t = window.setInterval(() => {
      if(this.timer == 100){
        this.success = false;
        // this.profilePicUrl = 'https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg';
        this.profilePicUrl = 'https://static.toiimg.com/thumb/resizemode-4,msid-76729536,width-1200,height-900/76729536.jpg';
        clearInterval(t)
      }else{
        this.timer++;
      }
    }, 30)
  }
}
