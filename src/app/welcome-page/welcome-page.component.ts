import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * WelcomePageComponent is a component that displays a welcome page with buttons to open dialogs for
 * user login and registration.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
    /**
   * Constructs a new instance of the WelcomePageComponent.
   * @param dialog The MatDialog service used to open the user login and registration dialogs.
   */
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

   /**
   * Opens a dialog for user registration.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

   /**
   * Opens a dialog for user registration.
   */
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}