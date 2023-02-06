import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http : HttpClient) { }
  
  LoginWithGoogle(credential: string) {
    console.log(credential);
    return this.http.post('http://localhost:5000/api/login/google', { credential });
  }


}
