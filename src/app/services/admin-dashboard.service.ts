import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = "http://localhost:8095/admin/dashboard";

  constructor(private http:HttpClient,private authService:AuthService) { }

  private getHeaders(): HttpHeaders{
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }



  getKpiCardsData(): any {
    return this.http.get(`${this.apiUrl}/kpi`, { headers: this.getHeaders() });
  }


  getUsersPerMonth(): any {
    return this.http.get(`${this.apiUrl}/users-per-month`, { headers: this.getHeaders() });
  }

  getCompanysPerMonth(): any {
    return this.http.get(`${this.apiUrl}/company-per-month`, { headers: this.getHeaders() });
  }

  getTop5CompaniesByJobPostingsCount(): any {
    return this.http.get(`${this.apiUrl}/findTop5CompaniesByJobPostingsCount`, { headers: this.getHeaders() });
  }

  getApplicationStatusData() {
    return this.http.get<any[]>(`${this.apiUrl}/application-status`, {
      headers: this.getHeaders()
    });
  }

  getMonthlyJobPostings() {
    return this.http.get<number[]>(`${this.apiUrl}/get-monthly-job-postings`, {
      headers: this.getHeaders()
    });
  }


  gettop5ByCopanyCreated() {
    return this.http.get<any[]>(`${this.apiUrl}/get-top-5-by-copany-created`, {
      headers: this.getHeaders()
    });
  }

}
