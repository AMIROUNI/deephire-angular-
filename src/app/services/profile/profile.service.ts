import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile/profile.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8095/profiles';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  completeProfile(profileData: any): Observable<any> {
    console.log('Profile data:', profileData); // Debugging line
    console.log('Headers:', this.getHeaders().get('Authorization')); // Debugging line
    return this.http.post(`${this.apiUrl}/complete-profile`, profileData, {
      headers: this.getHeaders()
    });
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/my-profile`, {
      headers: this.getHeaders()
    });
  }

  updateProfile(profileData: any): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/update`, profileData, {
      headers: this.getHeaders()
    });
  }

  

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/upload-profile-picture`, formData, {
      headers: headers
    });
  }

  uploadBackgroundImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/upload-background-image`, formData, {
      headers: headers
    });
  }

  isProfileComplete(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-complete`, {
      headers: this.getHeaders()
    });



  }



  skipProfileCompletion(): Observable<any> {
    return this.http.post(`${this.apiUrl}/skip-profile`, {}, {
      headers: this.getHeaders()
    });
  }
}