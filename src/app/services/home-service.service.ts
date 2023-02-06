import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SinglePipe } from '../m-main-body/Pipe.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  constructor(private http: HttpClient,) { }

  getPipes() {
    return this.http.get<SinglePipe[]>(`${environment.apiendpoint}/api/pipes}`);
  }

  postPipe(param: any) {
    return this.http.post<SinglePipe>(`${environment.apiendpoint}`, param);
  }

}