import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPosting } from '../models';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private apiUrl = "http://localhost:8095/job-posting";

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addJobPosting(job: JobPosting): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-job-posting`, job, {
      headers: this.getHeaders()
    });
  }

  
  getJobPostings(): Observable<JobPosting[]> {
   
    return this.http.get<JobPosting[]>(`${this.apiUrl}/get-job-posting`, { headers: this.getHeaders() });
    
  }

}