import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInObservable = new BehaviorSubject(false);
  isLoggedIn = this.isLoggedInObservable.asObservable();


  changeLoginStatus(status: boolean) {
    this.isLoggedInObservable.next(status);
  }

  constructor(private http: HttpClient) { }

  LoginWithGoogle(credential: string) {
    console.log(credential);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('authorizationToken', credential)

    return this.http.post(`${environment.apiendpoint}/api/register/google`, { credential }, { 'headers': headers });
  }
}
