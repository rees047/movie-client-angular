import { Component, OnInit, Input } from '@angular/core';

//you'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//this import brings in the API calls we created i 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

//this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void{
    this.fetchApiData.UserLogin(this.userData).subscribe((success) => {
      console.log(success);
      //logic for a successful user login goes here! (to be implemented)
      this.dialogRef.close(); //this will close the modal on success!
      this.snackBar.open(success, 'OK', {
        duration: 2000
      });
    }, (error) => { //error
      console.log(error);
      this.snackBar.open(error, 'OK', {
        duration: 2000
      });
    });
  }

}
