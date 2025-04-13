// job-page.component.ts
import { Component, OnInit } from '@angular/core';
import { JobPosting } from '../../models/job/job-posting.model';

@Component({
  selector: 'app-job-page',
  standalone: false,
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit {
  allJobs: JobPosting[] = []; // All jobs from API
  filteredJobs: JobPosting[] = []; // Filtered jobs
  selectedJob: JobPosting | null = null;
  locations: string[] = [];
  hasMoreJobs = false;
  private visibleJobs = 5;

  ngOnInit() {
    this.loadMockData();
    this.extractLocations();
    this.filteredJobs = this.allJobs.slice(0, this.visibleJobs);
    this.hasMoreJobs = this.allJobs.length > this.visibleJobs;
  }

  loadMockData() {
    // Replace with your actual data service
    this.allJobs = [
      {
        id: 1,
        title: 'Développeur Full Stack Senior',
        description: `Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe technique.\n\nResponsabilités:\n- Développer des fonctionnalités frontend et backend\n- Collaborer avec l'équipe produit\n- Participer aux revues de code\n\nCompétences techniques requises:\n- Angular 12+\n- Node.js/NestJS\n- MongoDB/PostgreSQL`,
        requirements: 'Angular, Node.js, MongoDB, 5+ ans expérience',
        location: 'Tunis, Tunisie',
        datePosted: '2025-04-10T10:00:00Z',
        company: {
          id: 1,
          name: 'DeepHire',
          logo: 'assets/images/deephire-logo.png'
        },
        statusOfCvs: []
      },
      // Add more mock jobs...
    ];
  }

  extractLocations() {
    const uniqueLocations = new Set(this.allJobs.map(job => job.location).filter(Boolean));
    this.locations = Array.from(uniqueLocations) as string[];
  }

  onSelectJob(job: JobPosting) {
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
    // Extract responsibilities from description
    const matches = description.match(/- (.*?)(?=\n|$)/g);
    return matches ? matches.map(m => m.replace('- ', '')) : [];
  }

  getSkills(requirements?: string): string[] {
    return requirements?.split(',').map(s => s.trim()) || [];
  }
}
