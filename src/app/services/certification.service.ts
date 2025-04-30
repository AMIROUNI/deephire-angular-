  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { Certification } from '../models';
  import { AuthService } from './auth/auth.service';

  @Injectable({
    providedIn: 'root'
  })
  export class CertificationService {

    private apiUrl = "http://localhost:8095/certification";

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }

    addCertification(certification: Certification): Observable<any> {
      return this.http.post(`${this.apiUrl}/add-certification`, certification, { headers: this.getHeaders() });
    }

    
    deleteCertification(certificationDto: Partial<Certification>): Observable<any> {
      return this.http.post(`${this.apiUrl}/delete-certification`, certificationDto , {headers: this.getHeaders()});
    }
  }
