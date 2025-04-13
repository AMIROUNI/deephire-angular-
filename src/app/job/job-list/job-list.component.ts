import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobPosting } from '../../models';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  @Input() jobs: JobPosting[] = [];
  @Output() selectJob = new EventEmitter<JobPosting>();
}
