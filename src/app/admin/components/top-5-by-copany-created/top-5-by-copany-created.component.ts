import { Component } from '@angular/core';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { Company } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-5-by-copany-created',
  standalone: false,
  templateUrl: './top-5-by-copany-created.component.html',
  styleUrl: './top-5-by-copany-created.component.css'
})
export class Top5ByCopanyCreatedComponent {
  companies: Company[] = [];

  constructor(
    private adminDashboard: AdminDashboardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminDashboard.gettop5ByCopanyCreated().subscribe(
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
