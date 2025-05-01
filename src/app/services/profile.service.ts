import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8095/profiles';

  constructor(private http: HttpClient, private authService: AuthService) { }



  updateProfile(
    profileData: {
      firstName: string;
      lastName: string;
      bio: string;
      location: string;
      headline: string;
      summary: string;
    },
    profilePicture?: File,
    backGroundImage?: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('profileData', JSON.stringify(profileData));

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    if (backGroundImage) {
      formData.append('backGroundImage', backGroundImage);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(`${this.apiUrl}/update`, formData, { headers });
  }
}
