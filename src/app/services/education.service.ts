import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Education } from '../models/profile/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiUrl = "http://localhost:8095/education";

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addEducation(education: Education): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-education`, education, {
      headers: this.getHeaders()
    });
  }


  deleteEducation(educationDto: Partial<Education>): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-education`, educationDto, {headers:this.getHeaders(),observe: 'response'});
  }
}
