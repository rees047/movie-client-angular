import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Title } from '@angular/platform-browser'; //this import is used for setting html title
import { Router } from '@angular/router'; //this import is used for routing
import { Observable } from 'rxjs';

//this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
//import { ShareDataService } from '../share-data.service';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieSummaryComponent } from '../movie-summary/movie-summary.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  movies: any [] = [];
  constructor(
    private titleService: Title,
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public toolbar: MatToolbarModule,
    public router: Router,
    //private shareData: ShareDataService
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.setTitle();
    //console.log(this.shareData.getData());
  }

  //set html title 
  setTitle(){
    this.titleService.setTitle('CineFiles Angular');
  }

  logoutUser(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('uid');
    //this.shareData.clearData();
    this.router.navigate(['welcome']);
  }

  getMovies(): void{
    this.fetchApiData.getAllMovies().subscribe((success: any) => {
      this.movies = success;
      let imageSRC = 'https://cinefiles-api.herokuapp.com/'
      //let imageSRC = 'http://localhost:8080';

      this.movies.map((movie) => {
          movie.imagePath = imageSRC + movie.imagePath;
      });
     
      //console.log(this.movies);
      this.getUserName();
      return this.movies;
    },(error) => {
      //console.log(error);
      this.router.navigate(['welcome']);
      this.snackBar.open('Please login to view movies', 'OK', {
        duration: 2500
      });
    }); 
  }

  getUserName(): Observable<any>{
    const user:any = localStorage.getItem('user');
    console.log(user);
    return user;
  }

  openGenreDialog(myData:any): void{
    //console.log(myData);
    this.dialog.open(GenreViewComponent,{
      width: '50%',
      data: myData
    });    
  }

  openDirectorDialog(myData:any): void{
    //console.log(myData);
    this.dialog.open(DirectorViewComponent,{
      width: '50%',
      data: myData
    });    
  }

  openMovieSummaryDialog(myData:any): void{
    //console.log(myData);
    this.dialog.open(MovieSummaryComponent,{
      width: '50%',
      data: myData
    });    
  }
}
