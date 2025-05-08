import { Component, OnInit } from '@angular/core';
import { JobPostingStatusDto } from '../../models/job/JobPostingStatusDto';
import { JobPostingService } from '../../services/job-posting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css'],
  standalone:false
})
export class AppliedJobsComponent implements OnInit {
  appliedJobs: JobPostingStatusDto[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(
    private jobPostingService: JobPostingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppliedJobs();
  }

  loadAppliedJobs(): void {
    this.jobPostingService.getAppliedJobs().subscribe({
      next: (jobs) => {
        this.appliedJobs = jobs;
        this.calculateTotalPages();
      },
      error: (err) => {
        console.error('Error fetching applied jobs:', err);
      }
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.appliedJobs.length / this.itemsPerPage);
  }

  getStatusCount(status: string): number {
    return this.appliedJobs.filter(job => job.status.toLowerCase() === status.toLowerCase()).length;
  }

  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      'applied': 'fas fa-paper-plane',
      'interview': 'fas fa-handshake',
      'offer': 'fas fa-award',
      'rejected': 'fas fa-times-circle',
      'accepted': 'fas fa-check-circle'
    };
    return statusIcons[status.toLowerCase()] || 'fas fa-question-circle';
  }

  getDaysSinceApplied(dateString: string): number {
    const appliedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  openJobDetails(job: JobPostingStatusDto): void {
    // Implement navigation to job details or open a modal
    console.log('Opening job details:', job);
    // Example: this.router.navigate(['/jobs', job.id]);
  }

  viewJobPosting(event: Event, jobId: string): void {
    event.stopPropagation();
    // Implement view job posting logic
    console.log('View job posting:', jobId);
  }

  withdrawApplication(event: Event, jobId: string): void {
    event.stopPropagation();
    // Implement withdraw application logic
    console.log('Withdraw application:', jobId);

  }

  saveJob(event: Event, jobId: string): void {
    event.stopPropagation();
    // Implement save job logic
    console.log('Save job:', jobId);
  }

  openFilters(): void {
    // Implement filter dialog/modal
    console.log('Open filters');
  }

  openSortOptions(): void {
    // Implement sort options dialog/modal
    console.log('Open sort options');
  }

  navigateToJobSearch(): void {
    this.router.navigate(['/jobs']);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Implement pagination logic if needed
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // Implement pagination logic if needed
    }
  }

  // If you need paginated jobs for display
  get paginatedJobs(): JobPostingStatusDto[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.appliedJobs.slice(startIndex, startIndex + this.itemsPerPage);
  }
}