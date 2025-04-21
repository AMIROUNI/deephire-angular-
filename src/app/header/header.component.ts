import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {
    // Mock login state based on URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = event.url.includes('/feed'); // Fake login logic
      }
    });
  }




  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log("Logout successful", res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Logout error", err);}
    });
  }
}
