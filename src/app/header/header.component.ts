import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn = false;

  constructor(private router: Router) {
    // Mock login state based on URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = event.url.includes('/feed'); // Fake login logic
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
