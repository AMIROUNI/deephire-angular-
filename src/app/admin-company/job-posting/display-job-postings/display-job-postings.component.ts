import { Component, OnInit } from '@angular/core';
import { JobPostingService } from '../../../services/job-posting.service';
import { JobPosting } from '../../../models';
import { Router } from '@angular/router';

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

  constructor(private jobPostingService: JobPostingService, private router: Router) {}

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

  onEdit(job: JobPosting): void {
    console.log('Edit job with ID:', job);
    this.router.navigate(['/edit-jobs', job]);
  }

  onDelete(job : JobPosting): void {
    if (confirm('Are you sure you want to delete this job posting?')) {
      this.isLoading = true;
      this.jobPostingService.deleteByDto(job).subscribe({
        next: () => {
        console.log('Job posting deleted successfully!');
        console.log( "job posting "+job);

        this.isLoading = false;


     // Reload the page to reflect changes
           
          alert('Job posting deleted successfully!');
          window.location.reload(); 
     
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete job posting. Please try again.';
          this.isLoading = false;
          console.error('Error deleting job posting:', err);
        }
      });
    }
  }

  onAddNew(): void {
    // Implement add new functionality
    console.log('Add new job posting');
    // You would typically navigate to an add new page here
  }
}