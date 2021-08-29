import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

/**
 * Default View of the Angular Client API
 * uses matDialog to open the register and login buttons
 */
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
  }

  //this is the function that will open the dialog when the sign up button is clicked

  openRegisterUserDialog(): void {
    this.dialog.open(RegisterFormComponent, {
      width: '25%' //assigning the dialog a width
    });
  }

  openLoginUserDialog(): void{
    this.dialog.open(LoginFormComponent,{
      width: '25%' //assigning the dialog a width
    });
  }

}
