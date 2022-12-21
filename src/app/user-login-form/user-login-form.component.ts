import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  
  ngOnInit(): void {
  }

  /**
   * Sends user information to API and then sends user to movie view
   * @function loginUser
   */
      loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        console.log(result)
        localStorage.setItem('user', result.user.username )
        localStorage.setItem('token', result.token )
       this.dialogRef.close(); // This will close the modal on success!
       this.snackBar.open("User Login successful", 'OK', {
          duration: 2000
       });
       this.router.navigate(['movies']);
      }, (result) => {
        this.snackBar.open("User Login failed", 'OK', {
          duration: 2000
        });
      });
    }
  
    }
