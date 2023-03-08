import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education } from '../model/model';
import { AuthService } from './auth.service';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private endpoint = environment.apiUrl + "/educations";

  constructor(private http: HttpClient, private authService: AuthService) { }

  save(data: Education) {
    
    if (data.id !== null) {
      return this.http.patch(this.endpoint + '/' + data.id, data);
    } else {
      return this.http.post(this.endpoint, data);
    }

  }

  delete(id: number) {
    return this.http.delete(this.endpoint + '/' + id);
  }
}
