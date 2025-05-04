import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCompanyDashboardService {

  private apiUrl = "http://localhost:8095/admin-company/dashboard";

  constructor(private http:HttpClient,private authService:AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getKpiCardsData(): any {
    return this.http.get(`${this.apiUrl}/kpi`, { headers: this.getHeaders() });
  }


  getRecruitersPerMonth(): any {
    return this.http.get(`${this.apiUrl}/recruiters-per-month`, { headers: this.getHeaders() });
  }

  getJobPostingsPerMonth(): any {
    return this.http.get(`${this.apiUrl}/job-postings-per-month`, { headers: this.getHeaders() });
  }

  getWelcomeCardData(): any {
    return this.http.get(`${this.apiUrl}/information-welcome-card`, { headers: this.getHeaders() });
  }

}
