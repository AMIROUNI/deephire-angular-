import { Component } from '@angular/core';
import { AdminCompanyDashboardService } from '../../../services/admin-company-dashboard.service';
import { UserCompany } from '../../../models/dashboard/UserCompany';

@Component({
  selector: 'app-welocme-card-ac',
  standalone: false,
  templateUrl: './welocme-card-ac.component.html',
  styleUrl: './welocme-card-ac.component.css'
})
export class WelocmeCardAcComponent {

  today: Date = new Date();

  constructor(private adminCompanyDashboardService : AdminCompanyDashboardService) { }

  welcomeCardData!: UserCompany; // Initialize with a default value or leave it undefined
  ngOnInit(): void {

    this.adminCompanyDashboardService.getWelcomeCardData().subscribe(
      (data:UserCompany) => {
        this.welcomeCardData = data;
        console.log("welcomeCardData",this.welcomeCardData)
      },
      (error:string) => {
        console.error('Error fetching welcome card data:', error);
      }
    );
    
  }

  

}
