import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://lamptissue-movie-flix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
    // Non-typed response extraction
    private extractResponseData(res: any): any {
      const body = res;
      return body || { };
    }
  
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

//User Login 
userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
  catchError(this.handleError)
  );
}

//Get one movie
getOneMovie(title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies' + 'title', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//get director
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

//Get genre
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
//Get user
getUser(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users',  {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//Get favourite movies for a user
getFavouriteMovie(MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'user' + "username" + "movies" + 'MovieID', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//Add a movie to favourite movies
addMovietoFavourite(MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'user' + 'username' + 'movies' + 'MovieID', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//Edit user
updateUser(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'user' + 'username', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//Delete user
deleteUser(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'user' + 'username', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//Delete a movie from the favourites movie
deleteFavouriteMovie(MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'user' + 'username' + 'movies' + 'MovieID', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  //Get all Movies
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

// User registration
// User login
// Get all movies
// Get one movie
// Get director
// Get genre
// Get user
// Get favourite movies for a user
// Add a movie to favourite Movies
// Edit user
// Delete user and
// Delete a movie from the favorite movies
