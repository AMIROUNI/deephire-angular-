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
  userImg: string = '';
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isAuthenticated();
      }
    });
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.isLoggedIn = this.authService.isAuthenticated();

    // Si tu veux aussi récupérer l'image depuis le token (s'il est dedans)
    // sinon tu peux commenter ça.
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = JSON.parse(atob(token.split('.')[1]));
      this.userImg = decoded.picture || 'assets/images/default-avatar.png';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => console.error("Logout error", err)
    });
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
