import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  LoginWithGoogle(credential: string) {
    return this.http.post('http://localhost:5000/api/auth/google', { credential });
  }

  constructor(private http : HttpClient) { }

}
