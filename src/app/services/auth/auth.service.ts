import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequest } from '../../models/auth/signup-request';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8095/api/auth';



  constructor(private http: HttpClient,private router: Router) {}


  //register user

  registerUser(signupData: SignupRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl+"/signup", signupData, { headers });
}

login(credentials: { username : string, password: string }): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  if(this.isAuthenticated())localStorage.removeItem('token');
  return this.http.post<any>(`${this.apiUrl}/signin`, credentials, { headers });
}
saveToken(token: string) {
  localStorage.setItem('token', token);
}

getToken(): string | null {
  return localStorage.getItem('token');
}

getRole(): string | null {
  const token = this.getToken();
  console.log("token",token)
  if (!token) return null;

  const payload = token.split('.')[1];
  console.log("payload",payload)
  const decodedPayload = atob(payload);
  console.log("decodedPayload",decodedPayload)
  const parsedPayload = JSON.parse(decodedPayload);
  console.log("parsedPayload",parsedPayload)

  // Assume: roles are in parsedPayload.roles or parsedPayload.role
  const roles = parsedPayload.roles || parsedPayload.role;
  console.log("roles",roles)
  return Array.isArray(roles) ? roles[0] : roles;
}




getRole2(): string | null {
  const token = this.getToken();
  console.log("token",token)
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    const roles = decoded.roles || decoded.role;
    return Array.isArray(roles) ? roles[0] : roles;
  } catch (error) {
    console.error("Erreur de décodage du token :", error);
    return null;
  }
}
redirectByRole(): void {
  const role = this.getRole();

  console.log("role",role)

  switch (role) {
    case 'ROLE_ADMIN':
      this.router.navigate(['/admin']);
      break;
    case 'ROLE_USER':
      this.router.navigate(['/feed']);
      break;
    case 'ROLE_RECRUITER':
      this.router.navigate(['/feed']);
      break;
    case 'ROLE_ADMINCOMPANY':
      this.router.navigate(['/complete-profile-company']);
      break;
    default:
      this.router.navigate(['/unauthorized']);
      break;
  }
}


private getHeaders(): HttpHeaders {
  const token = this.getToken();
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}

logout(): Observable<any> {
  const headers = this.getHeaders();
  console.log("headers",headers);
  return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers });

}


getCurrentUsername(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.username || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}


isAuthenticated(): boolean {
  return !!this.getToken();
}

}
