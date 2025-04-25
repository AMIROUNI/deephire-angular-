import { Component } from '@angular/core';
import { RhCompanyService } from '../../services/rh-company.service';
import { Router } from '@angular/router';
import { RHCompany } from '../../models/user/rh-company.model';

@Component({
  selector: 'app-recruiter-management',
  templateUrl: './recruiter-management.component.html',
  styleUrls: ['./recruiter-management.component.css']
})
export class RecruiterManagementComponent {
  recruiters: RHCompany[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private rhCompanyService: RhCompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecruiters();
  }

  loadRecruiters(): void {
    this.rhCompanyService.getAllRecruiters().subscribe({
      next: (data) => {
        this.recruiters = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading recruiters';
        this.loading = false;
      }
    });
  }

  deleteRecruiter(id: number): void {
    if (confirm('Are you sure you want to delete this recruiter?')) {
      this.rhCompanyService.deleteRhCompany(id).subscribe({
        next: () => {
          this.recruiters = this.recruiters.filter(r => r.id !== id);
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Error deleting recruiter');
        }
      });
    }
  }

  editRecruiter(id: number): void {
    this.router.navigate(['/admin/edit-recruiter', id]);
  }

  addRecruiter(): void {
    this.router.navigate(['/admin/add-recruiter']);
  }
}