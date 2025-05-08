// job-page.component.ts
import { Component, OnInit } from '@angular/core';
import { JobPostingService } from '../../services/job-posting.service';
import { JobCompany } from '../../models/job/job-company.model';
@Component({
  selector: 'app-job-page',
  standalone: false,
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit {
    // popup variables ///////////////////////////////////////////////////////////////
    showPopup = false;
    popupTitle = '';
    popupMessage = '';
    popupIsSuccess = false;
    popupRedirectPath: string | null = null;
    showCancelButton = false;




  allJobs: JobCompany[] = [];
  filteredJobs: JobCompany[] = [];
  selectedJob: JobCompany | null = null;
  locations: string[] = [];
  hasMoreJobs = false;
  private visibleJobs = 5;

  constructor(private jobService: JobPostingService) {}

  ngOnInit() {
    this.loadJobsFromAPI();
  }

  loadJobsFromAPI() {
    this.jobService.getAllJobPostings().subscribe({
      next: (jobs) => {
        this.allJobs = jobs;
        console.log(this.allJobs[0].id);
        this.extractLocations();
        this.filteredJobs = this.allJobs.slice(0, this.visibleJobs);
        this.hasMoreJobs = this.allJobs.length > this.visibleJobs;
      },
      error: (err) => {
        console.error('Failed to load job postings:', err);
      }
    });
  }

  extractLocations() {
    const uniqueLocations = new Set(this.allJobs.map(job => job.location).filter(Boolean));
    this.locations = Array.from(uniqueLocations) as string[];
  }

  onSelectJob(job: JobCompany) {
    this.selectedJob = job;
    // Scroll to top of details panel
    document.querySelector('.job-content')?.scrollTo(0, 0);
  }

  filterJobs(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJobs = this.allJobs
      .filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.requirements?.toLowerCase().includes(searchTerm))
      .slice(0, this.visibleJobs);
  }

  filterByLocation(event: Event) {
    const location = (event.target as HTMLSelectElement).value;
    if (!location) {
      this.filteredJobs = this.allJobs.slice(0, this.visibleJobs);
    } else {
      this.filteredJobs = this.allJobs
        .filter(job => job.location === location)
        .slice(0, this.visibleJobs);
    }
    this.hasMoreJobs = this.filteredJobs.length === this.visibleJobs;
  }

  loadMoreJobs() {
    this.visibleJobs += 5;
    this.filteredJobs = this.allJobs.slice(0, this.visibleJobs);
    this.hasMoreJobs = this.allJobs.length > this.visibleJobs;
  }

  getResponsibilities(description: string): string[] {
    const matches = description.match(/- (.*?)(?=\n|$)/g);
    return matches ? matches.map(m => m.replace('- ', '')) : [];
  }

  getSkills(requirements?: string): string[] {
    return requirements?.split(',').map(s => s.trim()) || [];
  }
  applyToJob(jobId: number) {
    console.log('Applying to job:', jobId);
    this.jobService.applyToJob(jobId).subscribe({
      next: () => {
        console.log('Application submitted successfully');
        this.showSuccessPopup('Application submitted successfully','Application Submitted');
      },
      error: (err) => {
        console.error('Failed to submit application:', err);
        if (err.status === 409) {
          this.showErrorPopup('You have already applied to this job','Application Already Submitted');
        }
      }
    });
  }



  /// popup methods //////////////////////////////////////////

  showSuccessPopup(successMessage: string,title:string) {
    this.popupTitle = title;
    this.popupMessage = successMessage;
    this.popupIsSuccess = true;
    this.popupRedirectPath = null;
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string,title:string) {
    this.popupTitle = title;
    this.popupMessage = errorMessage;
    this.popupIsSuccess = false;
    this.popupRedirectPath = null;
    this.showCancelButton = true;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
////////////////////////////////////
}
