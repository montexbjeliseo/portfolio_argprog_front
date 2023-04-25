import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  endpoint = environment.apiUrl + "/projects";

  constructor(private http: HttpClient) { }

  save(data: Project) {
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
