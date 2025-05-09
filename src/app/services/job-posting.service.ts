import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPosting } from '../models';
import { AuthService } from './auth/auth.service';
import { JobCompany } from '../models/job/job-company.model';
import { JobPostingStatusDto } from '../models/job/JobPostingStatusDto';

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

  deleteByDto(job: JobPosting): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-by-dto`,  job,
            {    headers: this.getHeaders()
    });
  }

  jobPostings: JobPosting[] = []; // Fake in-memory list or get from backend



  updateJob(job:{ original: JobPosting; updated: any; }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, job,{headers:this.getHeaders()}); // Adjust endpoint as needed
  }

  getAllJobPostings(): Observable<JobCompany[]> {
    return this.http.get<JobCompany[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }
  applyToJob(jobId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/applyToJob/${jobId}`, {}, { headers: this.getHeaders() });
  }

  getAppliedJobs(): Observable<JobPostingStatusDto[]> {
    return this.http.get<JobPostingStatusDto[]>(`${this.apiUrl}/job-applied`, { headers: this.getHeaders() });
  }

}