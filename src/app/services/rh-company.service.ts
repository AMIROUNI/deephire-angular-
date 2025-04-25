import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RHCompany } from '../models/user/rh-company.model';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RhCompanyService {

 
  private apiUrl = 'http://localhost:8095/rh-companies';

  constructor(private http: HttpClient,private authService :AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all RH Companies
  getAllRhCompany(): Observable<RHCompany[]> {
    return this.http.get<RHCompany[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  // Get all recruiters (with ROLE_RECRUITER)
  getAllRecruiters(): Observable<RHCompany[]> {
    return this.http.get<RHCompany[]>(`${this.apiUrl}/recruiters`, { headers: this.getHeaders() });
  }

  // Get RH Company by ID
  getRhCompanyById(id: number): Observable<RHCompany> {
    return this.http.get<RHCompany>(`${this.apiUrl}/findById/${id}`,{ headers: this.getHeaders() });
  }

  // Create new RH Company
  addRhCompany(rhCompany: RHCompany): Observable<RHCompany> {



    return this.http.post<RHCompany>(`${this.apiUrl}/add`, rhCompany, { headers: this.getHeaders() });
  }

  // Update existing RH Company
  updateRhCompany(id: number, rhCompany: RHCompany): Observable<RHCompany> {
    return this.http.put<RHCompany>(`${this.apiUrl}/update/${id}`, rhCompany,{headers: this.getHeaders()});
  }

  // Delete RH Company
  deleteRhCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`,{ headers: this.getHeaders() });
  }
}