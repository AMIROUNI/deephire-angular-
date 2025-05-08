import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userImg: string = '';
  isLoggedIn = false;
  userRole: string | null = null;
  username: string ="";
  currentUser: User | null = null;

  constructor(private router: Router, private authService: AuthService,private userService: UserService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isAuthenticated();
      }
    });
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.isLoggedIn = this.authService.isAuthenticated();
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = JSON.parse(atob(token.split('.')[1]));
      this.userImg = decoded.picture ;
    }
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      this.username = this.currentUser?.username || '';
    });

    
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => console.error("Logout error", err)
    });
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  // Helpers
  isAdminCompanyOrRecruiter(): boolean {
    return this.userRole === 'ROLE_RECRUITER' || this.userRole === 'ROLE_ADMINCOMPANY';
  }

  isUser(): boolean {
    return this.userRole === 'ROLE_USER';
  }

  isAdmin(): boolean {
    return this.userRole === 'ROLE_ADMIN';
  }

  isAdminCompany(): boolean {
    return this.userRole === 'ROLE_ADMINCOMPANY';
  }
}
