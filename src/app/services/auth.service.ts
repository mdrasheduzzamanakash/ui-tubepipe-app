import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  LoginWithGoogle(credential: string) {
    // console.log(credential);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('authorizationToken', credential)

    return this.http.post('http://localhost:4000/api/login/google', { credential }, { 'headers': headers });
  }
}
