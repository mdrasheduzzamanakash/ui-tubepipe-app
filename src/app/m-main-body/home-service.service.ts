import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SinglePipe } from './Pipe.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  constructor(private http : HttpClient) { }

  getPipes() {
    return this.http.get<SinglePipe[]>(`http://localhost:3000/pipes`);
  }

  postPipe(param : any) {
    return this.http.post<SinglePipe>(`http://localhost:3000/pipes`, param);
  }

}