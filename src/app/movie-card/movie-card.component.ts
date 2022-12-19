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

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  FavouriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavouriteMovies;
      return this.favourites;
    });
  }
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
  GenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: Name,
        Description: Description,
      },
      width: '400px',
    });
  }
  SynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: Title,
        Description: Description,
      },
      width: '400px',
    });
  }

  getFavourites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavouriteMovies;
      console.log(this.favourites);
      return this.favourites;
    })
  }

  isFavourite(id: string): boolean {
    return this.favourites.includes(id);
  }

  addToFavourites(id: string): void{
    this.fetchApiData.addMovietoFavourite(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie added to favourites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

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