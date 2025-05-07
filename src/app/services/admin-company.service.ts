import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminCompany } from '../models/user/admin-company.model';
import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminCompanyService {
  private apiUrl = "http://localhost:8095/admin-company";

  constructor(private http:HttpClient,private authService:AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<AdminCompany[]> {
    return this.http.get<AdminCompany[]>(`${this.apiUrl}/all`);
  }

  create(recruiter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, recruiter);
  }

  update(id: number, recruiter: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, recruiter);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getById(id: number): Observable<AdminCompany> {
    return this.http.get<AdminCompany>(`${this.apiUrl}/findById/${id}`);
  }

  completeProfileCompany(formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // Do NOT set 'Content-Type' manually here
    });



  
    return this.http.post(
      `${this.apiUrl}/complete-profile-company`, 
      formData, 
      { headers: headers }
    );
  }




  updateCompanyProfile(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/update-company-profile`, 
      formData, 
      { headers: this.getHeaders() }
    );
  }
}