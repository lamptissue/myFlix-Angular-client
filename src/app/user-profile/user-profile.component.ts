import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Close dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // API
import { MatSnackBar } from '@angular/material/snack-bar'; // Notifications
import { Router } from '@angular/router'; // Routing

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  user: any = {};
  @Input() updatedUser: any = {  }
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,

  ) {}
  ngOnInit(): void {
    this.getUser();
  }

/**
 * Gets user info from the API
 * @returns object with user info
 * @function getUser
 */

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.updatedUser.username = this.user.username;
      this.updatedUser.email = this.user.email;
      this.updatedUser.Birthday = this.user.Birthday;
      console.log(this.updatedUser);
      return this.user;
    });
  }

  /**
   * updating the user data - returns to welcome screen
   * @function updatingUser
   */
  updatingUser(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe(
      (result) => {
        console.log(result)
        this.snackBar.open("Profile updated successfully!", 'OK', {
          duration: 2000,
        });
        if (this.updatedUser.username || this.updatedUser.password) {
          localStorage.clear();
          this.router.navigate(['welcome']);
          this.snackBar.open(
            'Please login again with your new credentials',
            'OK',
            {
              duration: 2000,
            }
          );
        } else {
          this.router.navigate(['movies']);
          this.snackBar.open(
            'Profile updated',
            'OK',
            {
              duration: 2000,
            }
          )
        }
      }
    );
  }

    /**
   * deleting the user - returnings back to welcome screen
   * @function deleteProfile
   */
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'Profile successfully deleted',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}