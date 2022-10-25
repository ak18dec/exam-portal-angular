import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  registeredEmail: string = '';
  instructionSent: boolean = false;
  constructor(
    private accountService: AccountService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void { 
    this.instructionSent = false;
  }

  send(f: NgForm) {
    this.registeredEmail = f.value.email;
    if(!this.registeredEmail || this.registeredEmail.length < 1) {
      this.notifierService.showNotification('No email is provided', '', 'error', false, 2000);
      return;
    }

    this.getForgotPasswordLink(this.registeredEmail);
  }

  resendCode() {
    this.getForgotPasswordLink(this.registeredEmail);
  }

  getForgotPasswordLink(email: string) {
    this.accountService.getForgotPasswordLink(email).subscribe(() => {
      this.notifierService.showNotification('Verification Code sent to registered email successfully', '', 'success', false);
      this.instructionSent = true;
    }, (error) => {
      this.notifierService.showNotification(error.error.message, '', 'error', false);
    });
  }

}
