import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile(3).subscribe((res: any)=>{
      this.profile = res;
    })
  }

}
