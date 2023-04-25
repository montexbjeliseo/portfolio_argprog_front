import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../model/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  endpoint = environment.apiUrl + '/skills';

  constructor(private http: HttpClient) { }

  save(data: Skill) {
    if (data.id !== null && data.id !== undefined) {
      return this.http.patch(this.endpoint + '/' + data.id, data);
    } else {
      return this.http.post(this.endpoint, data);
    }

  }

  delete(id: number) {
    return this.http.delete(this.endpoint + '/' + id);
  }
}
