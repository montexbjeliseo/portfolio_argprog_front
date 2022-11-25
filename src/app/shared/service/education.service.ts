import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education } from '../model/model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  save(data: Education) {
    let endpoint = "http://localhost:8080/api/educations";
    if (data.id != null) {
      endpoint += "/" + data.id;
    }
    console.log(this.authService.getAuthHeader());
    return this.http.post(endpoint, data,  {
      withCredentials: true,
      headers: this.authService.getAuthHeader(),
    });
  }
}
