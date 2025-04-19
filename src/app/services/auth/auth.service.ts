import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequest } from '../../models/auth/signup-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 


  private apiUrl = 'http://localhost:8095/api/auth';

  constructor(private http: HttpClient) {}
  registerUser(signupData: SignupRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl+"/signup", signupData, { headers });
}

registerUserWithFormData(formData: FormData): Observable<any> {
  return this.http.post<any>(this.apiUrl + "/signup", formData);
}

}
