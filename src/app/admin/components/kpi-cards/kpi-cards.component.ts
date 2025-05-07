import { Component } from '@angular/core';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { Kpi } from '../../../models/dashboard/kpi';

@Component({
  selector: 'app-kpi-cards',
  standalone: false,
  templateUrl: './kpi-cards.component.html',
  styleUrl: './kpi-cards.component.css'
})
export class KpiCardsComponent {

  kpis: Kpi[] = [];
  errorMessage: string | null = null;

  constructor(private adminDashboardService:AdminDashboardService) { }
ngOnInit(): void {
    this.fetchKpiData();
  }

  private fetchKpiData(): void {
    this.adminDashboardService.getKpiCardsData().subscribe({
      next: (data: Kpi[]) => {
        this.kpis = data;
      },
      error: (error : string) => {
        console.error('Error fetching KPI data', error);
        this.errorMessage = 'Unable to load KPI data.';
      }
    });
  }
}
