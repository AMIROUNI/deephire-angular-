import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userImg: string = ''; // Default image path
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService,private userService: UserService) {
    // Mock login state based on URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = event.url.includes('/feed'); // Fake login logic
      }
    });
  }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        console.log('User profile:', res.profilePicture);

        this.userImg = res.profilePicture || 'default-profile.png'; // Fallback to a default image if none is provided
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
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
