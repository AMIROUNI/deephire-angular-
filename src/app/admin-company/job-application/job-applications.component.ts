import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { JobApplication } from '../../models/job/JobApplication';
import { JobPostingService } from '../../services/job-posting.service';
import { Router, RouterLink } from '@angular/router';
import { StatusOfCvService } from '../../services/status-of-cv.service';


@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css'],
  standalone: false,
})
export class JobApplicationsComponent implements OnInit {
  searchControl = new FormControl('');
  allApplications: JobApplication[] = [];
  filteredApplications: JobApplication[] = [];
  currentStatusFilter: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'ALL';

  constructor(private jobPostingService: JobPostingService,private router: Router,private statusOfCvService:StatusOfCvService) {
    // Initialize the search control
  }

  ngOnInit(): void {

    this.generateMockData(); // Fetch job applications from the service
    
    // Mock data - in a real app, this would come from a servi
    this.filteredApplications = [...this.allApplications];

    // Setup search with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.applyFilters(searchTerm?.toLowerCase() || '', this.currentStatusFilter);
      });
  }

  generateMockData(): void {
    const statuses: ('PENDING' | 'APPROVED' | 'REJECTED')[] = ['PENDING', 'APPROVED', 'REJECTED'];
    
    this.jobPostingService.jobApplications().subscribe({
      next: (applications) => {
         console.log('Job applications:', applications);
        this.allApplications= applications;

        this.filteredApplications = [...this.allApplications];
      },
      error: (err) => {
        console.error('Error fetching job applications', err);
      }
    })
    
    
  }

  getStatusIcon(status: 'PENDING' | 'APPROVED' | 'REJECTED'): string {
    switch (status) {
      case 'PENDING':
        return 'hourglass_empty';
      case 'APPROVED':
        return 'check_circle';
      case 'REJECTED':
        return 'cancel';
      default:
        return '';
    }
  }

  applyFilters(searchTerm: string, statusFilter: typeof this.currentStatusFilter): void {
    this.filteredApplications = this.allApplications.filter(application => {
      const matchesSearch = 
        application.title.toLowerCase().includes(searchTerm) ||
        application.company.toLowerCase().includes(searchTerm) ||
        application.location.toLowerCase().includes(searchTerm) ||
        application.user.username.toLowerCase().includes(searchTerm) ||
        application.user.email.toLowerCase().includes(searchTerm);
      
      const matchesStatus = statusFilter === 'ALL' || application.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  filterByStatus(status: typeof this.currentStatusFilter): void {
    this.currentStatusFilter = status;
    this.applyFilters(this.searchControl.value?.toLowerCase() || '', status);
  }

  getStatusCount(status: 'PENDING' | 'APPROVED' | 'REJECTED'): number {
    return this.allApplications.filter(app => app.status === status).length;
  }

  getTotalApplications(): number {
    return this.allApplications.length;
  }


 viewProfile(username: string): void {
  console.log('View profile for:', username);
  this.router.navigate([`/profile/${username}`]);
}

approve(application: JobApplication): void {
  this.statusOfCvService.approve(application).subscribe({
    next: () => {
      console.log('Application approved:', application);
      this.generateMockData(); // Refresh the data after approval
    },
    error: (err) => {
      console.error('Error approving application', err);
    }
  });
}

reject(application: JobApplication): void {
  this.statusOfCvService.reject(application).subscribe({
    next: () => {
      console.log('Application rejected:', application);
      this.generateMockData(); // Refresh the data after rejection
    },
    error: (err) => {
      console.error('Error rejecting application', err);
    }
  });
}
}