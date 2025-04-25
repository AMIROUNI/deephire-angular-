import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RHCompany } from '../../models';
import { RhCompanyService } from '../../services/rh-company.service';

@Component({
  selector: 'app-display-recruiter',
  templateUrl: './display-recruiter.component.html',
  styleUrls: ['./display-recruiter.component.css'],
  standalone:false
})
export class DisplayRecruiterComponent implements OnInit {
  rhCompanies: RHCompany[] = [];
  error: string = '';
  isLoading: boolean = true;

  constructor(
    private rhCompanyService: RhCompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRhCompanies();
  }

  getRhCompanies(): void {
    this.isLoading = true;
    this.rhCompanyService.getAllRhCompany().subscribe({
      next: (data) => {
        this.rhCompanies = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error loading RH Companies';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.rhCompanyService.deleteRhCompany(id).subscribe({
        next: () => {
          this.rhCompanies = this.rhCompanies.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error(err);
          this.error = "Error deleting company";
        }
      });
    }
  }

  onEdit(id: number): void {
    this.router.navigate(['/edit-rh-company', id]);
  }

  onAddNew(): void {
    this.router.navigate(['/add-rh-company']);
  }
}