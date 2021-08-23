import { Component } from '@angular/core';

import { RegisterFormComponent } from './register-form/register-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-client-angular';

  constructor(public dialog: MatDialog){}

  //this is the function that will open the dialog when the sign up button is clicked

  openRegisterUserDialog(): void {
    this.dialog.open(RegisterFormComponent, {
      width: '280px' //assigning the dialog a width
    });
  }
}
