import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Company, User } from '../models';
import { Observable } from 'rxjs';
import { AdminCompanyDto } from '../models/company/AdminCompanyDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = "http://localhost:8095/admin";
      constructor(private httpClient:HttpClient,private authService:AuthService) { }


  private getHeaders(): HttpHeaders{
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.apiUrl}/all-users`,{headers:this.getHeaders()});
  }

  getAllCompanies():Observable<AdminCompanyDto[]>{
    return this.httpClient.get<AdminCompanyDto[]>(`${this.apiUrl}/all-companies`,{headers:this.getHeaders()});
  }

  banUser(userId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${userId}/ban`, {}, { headers: this.getHeaders() });
  }

  approveCompany(companyId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/company/${companyId}/approve`, {}, { headers: this.getHeaders() });
  }

  rejectCompany(companyId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/company/${companyId}/reject`, {}, { headers: this.getHeaders() });
  }

  unbanUser(userId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${userId}/unban`, {}, { headers: this.getHeaders() });
  }
}
