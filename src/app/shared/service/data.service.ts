import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get('http://localhost:8080/api/public/resources');
    //return this.http.get('/assets/json/example.json');
  }

}
