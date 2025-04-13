import { Component, Input } from '@angular/core';
import { JobPosting } from '../../models';

@Component({
  selector: 'app-job-details',
  standalone: false,
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  @Input() job?: JobPosting;
}
