import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { NotifierComponent } from '../modules/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(
    message: string, 
    buttonText: string, 
    messageType: 'error' | 'success' | 'info', 
    btn: boolean,
    duration?: number
    ) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        buttonText: buttonText,
        type: messageType,
        showBtn: btn
      },
      duration: duration || 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: messageType
    });
  }
}
