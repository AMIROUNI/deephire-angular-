import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  standalone: false,
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.css'
})
export class WelcomeCardComponent {
  adminName = 'Admin';
  todaysJobs = 5;
  newUsersToday = 8;
}
