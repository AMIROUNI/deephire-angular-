import { Component } from '@angular/core';
import { AdminCompanyDashboardService } from '../../../services/admin-company-dashboard.service';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { Company } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-companies',
  standalone: false,
  templateUrl: './top-companies.component.html',
  styleUrls: ['./top-companies.component.css']
})
export class TopCompaniesComponent {
  companies: Company[] = [];

  constructor(
    private adminDashboard: AdminDashboardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminDashboard.getTop5CompaniesByJobPostingsCount().subscribe(
      (response: Company[]) => {
        this.companies = response;
        console.log(this.companies);
      },
      (error: any) => {
        console.error('Error fetching top companies:', error);
      }
    );
  }

  viewCompanyDetails(companyId: number) {
    this.router.navigate(['/admin/companies', companyId]);
  }
}