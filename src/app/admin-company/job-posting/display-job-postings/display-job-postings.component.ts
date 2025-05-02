import { Component, OnInit } from '@angular/core';
import { JobPostingService } from '../../../services/job-posting.service';
import { JobPosting } from '../../../models';

@Component({
  selector: 'app-display-job-postings',
  templateUrl: './display-job-postings.component.html',
  styleUrls: ['./display-job-postings.component.css'],
  standalone: false
})
export class DisplayJobPostingsComponent implements OnInit {
  jobPostings: JobPosting[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(private jobPostingService: JobPostingService) {}

  ngOnInit(): void {
    this.loadJobPostings();
  }

  loadJobPostings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.jobPostingService.getJobPostings().subscribe({
      next: (data) => {
        this.jobPostings = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load job postings. Please try again later.';
        if (err.error?.message) {
          this.errorMessage += ` Error: ${err.error.message}`;
        }
        this.isLoading = false;
        console.error('Error loading job postings:', err);
      }
    });
  }

  onEdit(jobId: string): void {
    // Implement edit functionality
    console.log('Edit job with ID:', jobId);
    // You would typically navigate to an edit page here
  }

  onDelete(jobId: string): void {
    /*if (confirm('Are you sure you want to delete this job posting?')) {
      this.isLoading = true;
      this.jobPostingService.deleteJobPosting(jobId).subscribe({
        next: () => {
          this.jobPostings = this.jobPostings.filter(job => job.id !== jobId);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete job posting. Please try again.';
          this.isLoading = false;
          console.error('Error deleting job posting:', err);
        }
      });
    }*/
  }

  onAddNew(): void {
    // Implement add new functionality
    console.log('Add new job posting');
    // You would typically navigate to an add new page here
  }
}