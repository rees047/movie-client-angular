import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

//you'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//this import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

//this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//for layout designs
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

/**
 * Component for User Registration
 * data-bindidng is done through @input userData
 * and binded in HTML through ngModel
 */
export class RegisterFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', firstname: '', lastname: '', email: '', birthdate: ''};

   /*
  * Changes size for mobile view
  * uses Observable and Breakpoint Observer to determine appropriate sizing
  */
  //isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe('(max-width: 960px)');

  smallDialogSubscription:any = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    public snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.smallDialogSubscription = this.isExtraSmall.subscribe(result => {
      if(result.matches){
        this.dialogRef.updateSize('100%');
      }else{
        this.dialogRef.updateSize('25%');
      }
    });
  }

  //this is the funciton responsible for sending the form inputs to the backend
  registerUser(): void{
    this.fetchApiData.UserRegister(this.userData).subscribe((success) => {
      //console.log(success);
      
      //logic for a successful user registration goes here (to be implemented)
      const msg = success.serverResponse[0].msg;
      this.dialogRef.close(); //this will close the modal on success
      this.dialogRef.afterClosed().subscribe(result => {
        this.smallDialogSubscription.unsubscribe();
      });
      this.snackBar.open(msg, 'OK',{
        duration: 2000
      });
    },(error) => {
      //console.log(error);
      const errArr = error.serverResponse;
      let errString = '';
      for(let i = 0; i < errArr.length; i++){
        errString += (i+1) + '. ' + errArr[i].msg + ( (i+1) != errArr.length ? '....* *....' : '');
      }

      this.snackBar.open(errString, 'OK', {
        duration: 5000
      });
    });
  }

}
