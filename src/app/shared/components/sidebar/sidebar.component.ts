import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { LoginService } from 'src/app/services/login.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent implements OnInit {

  fullName: string = '';
  email: string = '';
  profilePicUrl: string= '';

  selectedFile:File;
  timer: number = 0;
  success: boolean = false;

  @Input() isMobileDevice: boolean = false;

  constructor(
    public loginService: LoginService, 
    private fileService: FileService,
    private router: Router,
    private navService: NavService
    ) { }

  ngOnInit(): void {
    const user = this.loginService.getUser();
    this.fullName = `${user.firstName} ${user.lastName}`;
    this.email = user.email;
    this.profilePicUrl = 'https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png';
  }

  uploadProfilePic() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.fileService.uploadImage(fd).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        // @ts-ignore: Object is possibly 'null'.
        const progress = Math.round((event.loaded/event.total)*100);
        // console.log(`Upload Progress: ${progress} %`)
      }else if(event.type === HttpEventType.Response){
        // console.log(event);
      }
    })
  }

  onFileSelected(event: any) {
    // console.log(event);
    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile)
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

  public logout(){
    // console.log('logout clicked');
    this.loginService.logout();
    this.loginService.loginStatusSubject.next(true);
    this.router.navigate(['/']);
  }

  account() {
    // console.log('my account clicked')
    if(this.loginService.getUserRole() === 'ROLE_ADMIN'){
      this.router.navigate(['/admin/profile'])
    }else if(this.loginService.getUserRole() === 'ROLE_NORMAL'){
      this.router.navigate(['/user/profile'])
    }else {
      this.loginService.logout();
      this.router.navigate(['login']);
    }
  }

  closeSideBar() {
    this.navService.close();
  }

}
