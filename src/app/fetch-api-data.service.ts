import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//declaring the api url that will provide data or the client app
const apiURL = 'https://cinefiles-api.herokuapp.com/';
//const apiURL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})


/**
 * SERVICE for declaring API endpoints, handling errors and returning data results
 */
export class FetchApiDataService {
  /*
  * inject the HttpClient module to the constructor params
  * this will provide the HttpClient to the entire class, making it available via this.http
  */
  constructor(private http: HttpClient){

  }


  /**
   * API call for User Registration Endpoint
   * @serverMethod post
   * @param userDetails (username, password, firstname, lastname, email, birthdate)
   * @return jsonMessage
   */
  UserRegister(userDetails : any): Observable<any>{
    //console.log(userDetails);  
    return this.http
      .post(apiURL + 'register', userDetails)
      .pipe(catchError(this.handleError));
  }


   /**
   * API call for User Login Endpoint
   * @serverMethod get
   * @param userDetails (username, password)
   * @return jsonMessage
   */
  UserLogin(userDetails: any): Observable<any>{
    //console.log(userDetails);
    return this.http
      .post(apiURL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }


   /**
   * API call for Get All Movies Endpoint
   * @serverMethod get
   * @return jsonMovies
   */
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


   /**
   * API call for Get Movie by Title Endpoint
   * @serverMethod Get
   * @params title
   * @return jsonMovie
   */
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
  

   /**
   * API call for Get Director Endpoint
   * @serverMethod get
   * @params directorName
   * @return jsonDirectorInformation
   */
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


   /**
   * API call for Get Genre Endpoint
   * @serverMethod get
   * @params genre
   * @return jsonGenreInformation
   */
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


   /**
   * API call for Get User Profile Including Favorite Movies Endpoint
   * @serverMethod get
   * @params username
   * @return jsonUserInformation
   */
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


   /**
   * API call for Update User Profile Endpoint
   * @serverMethod put
   * @params username
   * @params param (firstname, lastname)
   * @return jsonUserInformation
   */
  updateUserProfile(username: any, params:any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(apiURL + `users/${username}`, params,{
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }


   /**
   * API call for Delete User Profile Endpoint
   * @serverMethod delete
   * @params username
   * @return jsonUserInformation
   */
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


   /**
   * API call for Add Movie to User Favorite Endpoint
   * @serverMethod post
   * @params username
   * @params movieTitle
   * @return jsonUserInformation
   */
  addFavoriteMovie(username: any, movieTitle: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(apiURL + `users/${username}/movies/${movieTitle}`, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }
  

   /**
   * API call for Delete Movie from User Favorite Endpoint
   * @serverMethod delete
   * @params username
   * @params movieTitle
   * @return jsonUserInformation
   */
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


   /**
   * Handle Errors from API Endpoint Results
   * @params error
   * @return error  
   */
  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.log('Some error occurred: ' + error.error.message);
    }else{
      console.error(`Error Status code ${error.status}`);
      /*console.error(        
        `Error Status code ${error.status}, ` + 
        `Error Body is: ${error.error.serverResponse}`
      );*/
    }
    return throwError(
      //'Something bad happened; please try again later.'
      error.error
    );
  }


   /**
   * Non-type Response Extraction
   * @params Response | Object
   * @return body || {}  
   */
  private extractResponseData(res: Response | Object): any{
    const body = res;
    return body || {};
  }

}