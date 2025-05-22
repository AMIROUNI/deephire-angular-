import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { JobApplication } from '../models/job/JobApplication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusOfCvService {
 constructor(private http: HttpClient, private authService: AuthService
 ) {}


  private apiUrl = "http://localhost:8095/status-of-cv";

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  approve(jobApplications:JobApplication): Observable<any> {
    console.log('jobApplications',jobApplications);
    return this.http.put<any>(`${this.apiUrl}/approve`,jobApplications, { headers: this.getHeaders() });
  }

  reject(jobApplications:JobApplication): Observable<any> {
     console.log('jobApplications',jobApplications);
    return this.http.put<any>(`${this.apiUrl}/reject`,jobApplications, { headers: this.getHeaders() });
  }
}
