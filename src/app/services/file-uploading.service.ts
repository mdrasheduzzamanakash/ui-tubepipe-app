import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';



class User {
  id: string = '';
  name: string = '';
  avatar: string = '';
  title : string = '';
  note : string = '';
  link : string = '';
  pipeId : string = '';
}


@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseURL = 'http://localhost:4010/api/compresspdf';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  // Get Users
  getUsers() {
    return this.http.get(this.baseURL);
  }
  // Create User
  addUser(name: string, profileImage: File, title : string, note : string, link : string, pipeId : string): Observable<any> {
    var formData: any = new FormData();
    formData.append('name', name);
    formData.append('avatar', profileImage);
    formData.append('title', title);
    formData.append('note', note);
    formData.append('link', link);
    formData.append('pipeId', pipeId);

    console.log("from service ",pipeId)
    
    return this.http.post<User>(`${this.baseURL}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}