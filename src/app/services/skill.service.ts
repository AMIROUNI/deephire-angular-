import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Skill } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = "http://localhost:8095/skills";

  constructor(private http:HttpClient,private authService:AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      
    });
  }


    addSkill( skill: Skill): Observable<any> {
      return this.http.post(`${this.apiUrl}/add-skill`, skill, { headers: this.getHeaders() });
    }

    
    deleteSkill(skillDto: Partial<Skill>): Observable<any> {
      return this.http.post(`${this.apiUrl}/delete-skill`, skillDto, {
        headers: this.getHeaders(),
        observe: 'response'
      });
    }
    

}
