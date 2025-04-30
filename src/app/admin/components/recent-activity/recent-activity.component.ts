import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-activity',
  standalone: false,
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.css'
})
export class RecentActivityComponent {
  activities = [
    'User John Doe registered.',
    'Company InnovateX posted a new job.',
    'Job "Frontend Developer" was created.',
    'User Jane Smith applied for "Backend Developer".'
  ];
}

