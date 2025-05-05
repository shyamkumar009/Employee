import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
  userType?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  userType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: RegisterPayload): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${this.baseUrl}/register`, userData);
  }

  login(userData: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, userData);
  }

  userLogin(credentials: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, credentials);
  }

  adminLogin(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/admin/login`, { email, password });
  }

  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
