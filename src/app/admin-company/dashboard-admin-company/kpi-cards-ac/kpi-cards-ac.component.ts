// src/app/components/admin-company-dashboard/kpi-cards-ac/kpi-cards-ac.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminCompanyDashboardService } from '../../../services/admin-company-dashboard.service';
import { Kpi } from '../../../models/dashboard/kpi';

@Component({
  selector: 'app-kpi-cards-ac',
  templateUrl: './kpi-cards-ac.component.html',
  styleUrls: ['./kpi-cards-ac.component.css'],
  standalone:false
})
export class KpiCardsAcComponent implements OnInit {
  kpis: Kpi[] = [];
  errorMessage: string | null = null;

  constructor(private dashboardService: AdminCompanyDashboardService) {}

  ngOnInit(): void {
    this.fetchKpiData();
  }

  private fetchKpiData(): void {
    this.dashboardService.getKpiCardsData().subscribe({
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
