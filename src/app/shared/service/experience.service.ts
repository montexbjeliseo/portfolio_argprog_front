import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from '../model/model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private endpoint = environment.apiUrl + "/experiences";

  constructor(private http: HttpClient) { }

  save(data: Experience) {
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
