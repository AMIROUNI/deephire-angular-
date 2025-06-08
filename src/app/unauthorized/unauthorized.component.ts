import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
  standalone: false
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  contactSupport() {
    // In a real app, this would open a support ticket or email
    console.log('Contacting support...');
    window.location.href = 'mailto:support@networkservice.com';
  }
}