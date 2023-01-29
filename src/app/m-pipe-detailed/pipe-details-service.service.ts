import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SinglePipe } from '../m-main-body/Pipe.interface';

@Injectable({
  providedIn: 'root'
})
export class PipeDetailsServiceService {

  constructor(private http : HttpClient) { }
  
  getPipeDetails(id : string){
    return this.http.get<SinglePipe>(`http://localhost:3000/pipes/` + id);
  }
}
