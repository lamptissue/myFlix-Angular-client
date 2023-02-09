import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//** Declaring the api url that will provide data for the client app */
const apiUrl = 'https://frightened-pink-onesies.cyclic.app/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 
 constructor(private http: HttpClient) {
  }

/**
   * Makes an API call to the user registration endpoint.
   * @service POST to apiUrl endpoint for register a new user
   * @param {any} userDetails
   * @returns new user object in json format
   * @function userRegistration
   */
    public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
     /**
   * Extracts the response data from a non-typed response.
   * @param res - The response from the server.
   * @returns The response body or empty object.
   */
    private extractResponseData(res: any): any {
      const body = res;
      return body || { };
    }
  
     /**
   * Handles an error in the API call.
   * @param error - The error that occurred.
   * @returns An error message.
   */
  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
      } else {
      console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`);
      }
      return throwError(
      'Something bad happened; please try again later.');
    }

 /**
   * User login
   * @service POST to apiUrl endpoint to login user
   * @param {any} userDetails
   * @returns new user object in json format
   * @function userLogin
   */
public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
  catchError(this.handleError)
  );
}

 /**
   * Get One Movie
   * @service GET to apiUrl endpoint to get movie by title
   * @param {string} Title
   * @returns array of movie object in json format
   * @function GetOneMovie
   */
  getOneMovie(Title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http
    .get(`${apiUrl}movies/${Title}`, 
    {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


/** 
   * Get Director
   * @service GET to apiUrl endpoint for Director information
   * @param {String} directorName
   * @returns director object in json format
   * @function getDirector
   */
getDirector(directorName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies' + 'directorName', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * Get Genre
   * @service GET to apiUrl endpoint for genre information
   * @param {string} genreName
   * @returns genre object in json format
   * @function getGenre
   */
getGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies' + 'genreName', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
/**
   * Get User.
   * @service GET to apiUrl endpoint for a user
   * @returns  user object in json format
   * @function getUser
   */
getUser(): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http
    .get(`${apiUrl}users/${username}`,  {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * Get favourite movies for a user
   * @service GET to apiUrl endpoint for users favourite movies
   * @returns array of users favourite movies object in json format
   * @function getFavouriteMovie
   */
getFavouriteMovie(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'user' + "username" + "movies" + 'MovieID', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * Add movie to favourite movies
   * @service POST to apiUrl endpoint for adding favourite movie
   * @param {string} MovieID
   * @returns user object in json format
   * @function addMovietoFavourite
   */
addMovietoFavourite(MovieID: string): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http
    .post(
      `${apiUrl}users/${username}/movies/${MovieID}`,
      { FavouriteMovie: MovieID },
       {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * Edit a user details
   * @service PUT to apiUrl endpoint to update users information
   * @returns user object in json format
   * @function updateUser
   */
updateUser(updatedUser: any): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http
    .put(`${apiUrl}users/${username}`, updatedUser, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * Delete user
   * @service DELETE to apiUrl endpoint for deleting a users profile
   * @returns a message
   * @function deleteUser
   */
deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
    .delete(`${apiUrl}users/${username}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * Delete a movie from the favourites movie
   * @service DELETE to apiUrl endpoint to remove favourite movies
   * @returns user object
   * @function deleteFavouriteMovie
   */
deleteFavouriteMovie(MovieID: string): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http
    .delete(`${apiUrl}users/${username}/movies/${MovieID}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * Get all Movies
   * @service GET to apiUrl endpoint to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}
