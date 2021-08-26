import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

//you'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//this import brings in the API calls we created i 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
//this import bring in the share-data service
//import { ShareDataService } from '../share-data.service'; //i created this service! yay!

//this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//this import is used for routing
import { Router } from '@angular/router';

//for layout designs
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: ''};

  //isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe('(max-width: 960px)');

  smallDialogSubscription:any = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    //private shareData: ShareDataService,
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

  loginUser(): void{
    this.fetchApiData.UserLogin(this.userData).subscribe((success) => {
      //console.log(success);
      
      //logic for a successful user login goes here! (to be implemented)      
      const token = success.token;
      const username = success.user.username;
      const uid = success.user._id;

      localStorage.setItem('token', token);
      localStorage.setItem('user', username);
      localStorage.setItem('uid', uid);

      this.dialogRef.close(); //this will close the modal on success!
      this.dialogRef.afterClosed().subscribe(result => {
        this.smallDialogSubscription.unsubscribe();
      });
      /*this.snackBar.open(`Welcome ${username}`, 'OK', {
        duration: 2000
      });*/
      //this.shareData.setData(success);
      this.router.navigate(['movies']); //navigate to movie view
    }, (error) => { //error
      //console.log(error);
      this.snackBar.open(error.message.message, 'OK', {
        duration: 2000
      });
    });
  }

}
