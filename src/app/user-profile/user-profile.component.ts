import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'; //this import is used for routing
import { Observable } from 'rxjs';

//use fetchApiDataService to get API data
import { FetchApiDataService } from '../fetch-api-data.service';

//Mat_Dialog_Data is used to get the data from the dialog
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
//for layout designs
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * Component for Displaying and Manipulating User Data
 * accepts data FROM movie-card/movie-component through MAT_DIALOG_DATA
 * @Inject(MAT_DIALOG_DATA) public data: any
 * userData:any = {}; holds data results so it can be accessed anywhere within the class
 */
export class UserProfileComponent implements OnInit {

  /*
  * Changes size for mobile view
  * uses Observable and Breakpoint Observer to determine appropriate sizing
  */
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  smallDialogSubscription:any = '';
  userData:any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
  ) { }

  ngOnInit(): void {
    //console.log(this.data);
    this.smallDialogSubscription = this.isExtraSmall.subscribe(result => {
      if(result.matches){
        this.dialogRef.updateSize('100%');
      }else{
        this.dialogRef.updateSize('50%', '80%');
      }
    });

    this.getUserData();
  }

  getUserData():void {
    const username = this.data;  //original data passed from the movie-view component
    this.fetchApiData.getUserProfile(username).subscribe((success: any) => {
      //console.log(success);
      this.userData = success;
      this.userData.birthdate = this.refineDate(this.userData.birthdate);
      return this.userData;
    }, (error) => {
      //console.log(error);
      this.close();
      this.snackBar.open('Something\'s Not Right', 'OK', {
        duration: 2000
      });
    })
  }

  close(): void{
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
        this.smallDialogSubscription.unsubscribe();
    });
  }

  refineDate(longDate: any){

    const date = new Date(longDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const dt = date.getDate(); //type number cannot be a string; angular is particular about data types
    const zero = 0;
    
    let formatDt = '';    
    let finalDate = '';

    const monthNames = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec ' ]

    if (dt < 10) {
      formatDt = zero.toString().concat(dt.toString())
    }else{
      formatDt = dt.toString();
    }

    finalDate = formatDt.concat(monthNames[month]);
    finalDate = finalDate.concat(year.toString());
    //console.log(finalDate);
    return finalDate;
  }   

  deleteMovie(movieTitle:any): void{
    this.fetchApiData.deleteFavoriteMovie(this.userData.username, movieTitle).subscribe((success: any) => {      
      //console.log(success);
      this.userData = success;
      this.userData.birthdate = this.refineDate(this.userData.birthdate);
      this.dialogRef.componentInstance.userData = this.userData;
      this.snackBar.open('Movie Deleted!', 'OK', {
        duration: 2000
      });     
    },(error) => {
      this.snackBar.open('Error Deleting Movie', 'OK', {
        duration: 2000
      });
    }); 
  }

  updateUserProfile(): void{
    let params:any = {
      firstname: this.userData.firstname,
      lastname: this.userData.lastname,
    }
   
    this.fetchApiData.updateUserProfile(this.userData.username, params).subscribe((success: any) => {
      this.snackBar.open('Profile Updated', 'OK', {
        duration: 2000
      });
    }, (error) => {
      const errArr = error.errors;
      let errString = '';
      for(let i = 0; i < errArr.length; i++){
        errString += (i+1) + '. ' + errArr[i].msg + ( (i+1) != errArr.length ? '....* *....' : '');
      }
      this.snackBar.open(errString, 'OK', {
        duration: 5000
      });
    })
  }

  deleteUserProfile(): void{
    this.fetchApiData.deleteUserProfile(this.userData.username).subscribe((success: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('uid');
      this.router.navigate(['welcome'])
      this.snackBar.open('Profile Deleted', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.log(error);
      this.snackBar.open('Error Deleting Profile', 'OK', {
        duration: 5000
      });
    })
  }

}
