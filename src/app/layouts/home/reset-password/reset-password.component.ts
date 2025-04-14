import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: false
})
export class ResetPasswordComponent implements OnInit {

  newPassword: string;
  confirmPassword: string;

  hideNewPassword = true;
  hideConfirmPassword = true;

  token: string | null = '';

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private accountService: AccountService,
    private notifierService: NotifierService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    })
  }

  resetPassword(f: NgForm) {
    this.newPassword = f.value.newPassword;
    this.confirmPassword = f.value.confirmPassword;

    if(this.newPassword === this.confirmPassword && this.token) {
      const payload = {
        newPassword : this.newPassword,
        confirmPassword: this.confirmPassword,
        token: this.token
      }
      this.accountService.passwordReset(payload).subscribe(() => {
        this.notifierService.showNotification('Password Updated Successfully', '', 'success', false);
        this.router.navigate(['login'])
      },
      (error) => {
        this.notifierService.showNotification(error.error.message, '', 'error', false);
      })
    }
  }

}
