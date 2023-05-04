import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient) {}
  private token= "";
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  getToken(): string {
    return this.token;
  }

  register(username: string, email: string, password: string, role : string[]): Observable<any> {
    
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        role
      },
      httpOptions
    );
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('auth-user')
  }


}