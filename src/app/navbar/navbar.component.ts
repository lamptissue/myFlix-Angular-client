import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(public router: Router) {}
  ngOnInit(): void {}

 onProfile(): void {
  this.router.navigate(['profile'])
 }

 onMainPage(): void {
  this.router.navigate(["movies"])
 }
  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }
}

