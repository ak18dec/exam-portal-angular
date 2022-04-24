import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../modules/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, buttonText: string, messageType: 'error' | 'success', btn: boolean) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        buttonText: buttonText,
        type: messageType,
        showBtn: btn
      },
      // duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: messageType
    });
  }
}
