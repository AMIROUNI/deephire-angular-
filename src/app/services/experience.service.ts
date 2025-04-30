import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../models';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl = "http://localhost:8095/experience";

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addExperience(experience: Experience): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-experience`, experience, { headers: this.getHeaders() });
  }

  deleteExperience(experienceDto: Partial<Experience>): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-experience`, experienceDto,{headers:this.getHeaders()});
  }
}
