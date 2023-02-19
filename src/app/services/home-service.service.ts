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
    return this.http.get<any>(environment.apiendpoint + '/api/pipes');
  }

  postPipe(param: any) {
    return this.http.post<SinglePipe>(environment.apiendpoint + '/api/pipes', param);
  }

  deletePipe(id: string) {
    return this.http.delete(environment.apiendpoint + `/api/pipes/${id}`);
  }

  updatePipe(id: string, param: any) {
    return this.http.put<SinglePipe>(environment.apiendpoint + `/api/pipes/${id}`, param);
  }

  getSinglePipe(id: string) {
    return this.http.get<SinglePipe>(environment.apiendpoint + `/api/pipes/${id}`);
  }

  addToEnrolled(id: string) {
    let email = localStorage.getItem('email');
    let pipeId = id;
    return this.http.post(environment.apiendpoint + `/api/pipes/enrolled`, {email, pipeId});
  }

  removeFromEnrolled(_id: any) {
    return this.http.delete(environment.apiendpoint + `/api/pipes/enrolled/${_id}`);
  }

  getAllEnrolled() {
    return this.http.get<any[]>(environment.apiendpoint + `/api/pipes/enrolled`);
  }

}