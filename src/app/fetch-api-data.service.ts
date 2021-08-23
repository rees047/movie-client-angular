import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//declaring the api url that will provide data or the client app
const apiURL = 'https://cinefiles-api.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  //inject the HttpClient module to the constructor params
  // this will provide the HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient){

  }

  //making the api call for the user registration endpoint
  UserRegister(userDetails : any): Observable<any>{
    console.log(userDetails);  
    return this.http.post(apiURL + 'register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //user login endpoint
  UserLogin(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.post(apiURL + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //get all movies
  getAllMovies(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get movie by title
  getMovieByTitle(title: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + `movies/${title}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }  
  
  //get director
  getDirector(directorName: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + `director/${directorName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  //get genre
  getGenre(genre: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + `movies/genre/${genre}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  //get user profile including favorite movies
  getUserProfile(username: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  //edit user
  updateUserProfile(username: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(apiURL + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  //delete user
  deleteUserProfile(username: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(apiURL + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  //add a movie to favorite movies
  addFavoriteMovie(username: any, movieTitle: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(apiURL + `users/${username}/movies/${movieTitle}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  //delete a movie from favorite movies
  deleteFavoriteMovie(username: any, movieTitle: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(apiURL + `users/${username}/movies/${movieTitle}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.log('Some error occurred: ' + error.error.message);
    }else{
      console.error(
        `Error Status code ${error.status}, ` + 
        `Error Body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  //non-type response extraction
  private extractResponseData(res: Response): any{
    const body = res;
    return body || {};
  }

}