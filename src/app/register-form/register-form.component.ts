import { Component, OnInit, Input } from '@angular/core';

//you'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//this import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

//this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  //this is the funciton responsible for sending the form inputs to the backend
  registerUser(): void{
    this.fetchApiData.UserRegister(this.userData).subscribe((result) => {
      //logic for a successful user registration goes here (to be implemented)
      this.dialogRef.close(); //this will close the modal on success
      this.snackBar.open(result, 'OK',{
        duration: 2000
      });
    },(result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
