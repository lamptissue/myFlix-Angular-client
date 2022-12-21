import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Notifications

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  favourites: any[] = [];
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
        ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavourites();
}

/**
 * Gets all movie from the API
 * @retruns array of movie objects
 * @function getMovies
 */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
 * Gets all favourite movies from the API
 * @retruns array of favourite movie ID objects
 * @function FavouriteMovies
 */
  FavouriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavouriteMovies;
      return this.favourites;
    });
  }

  /**
 * opens director information
 * @param {string} Name
 * @param {string} Bio
 * @param {string} Birth
 * @param {string} Death
 * @function DirectorDialog
 */
  DirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        Birth: Birth,
        Death: Death
      },
      width: '400px',
    });
  }
    /**
 * opens genre information
 * @param {string} Name
 * @param {string} Description
 * @function GenreDialog
 */
  GenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: Name,
        Description: Description,
      },
      width: '400px',
    });
  }
    /**
 * opens synopsis information
 * @param {string} Title
 * @param {string} Description
 * @function SynopsisDialog
 */
  SynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: Title,
        Description: Description,
      },
      width: '400px',
    });
  }

   /**
   * Gets user info from API and set favourites to a returned json file
   * @returns array holding movie ID of favourites
   * @function getFavourites
   */
  getFavourites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavouriteMovies;
      console.log(this.favourites);
      return this.favourites;
    })
  }

  /**
   * Checks to see if movie is in the users favourites
   * @param {string} id
   * @returns boolean
   * @function isFavourite
   */
  isFavourite(id: string): boolean {
    return this.favourites.includes(id);
  }
  /**
   * Adds a movie to a user's favourites
   * @param {string} id
   * @function addToFavorites
   */
  addToFavourites(id: string): void{
    this.fetchApiData.addMovietoFavourite(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favourites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  /**
   * Removes users favourite movie
   * @param {string} id
   * @function removeFavourites
   */
  removeFavourites(id: string): void{
    this.fetchApiData.deleteFavouriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie removed from favourites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
}