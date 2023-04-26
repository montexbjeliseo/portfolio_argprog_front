import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get(): Observable<{}>{
    return this.http.get(environment.apiUrl + '/public/resources');
  }

  changePhotoLink(link: string): Observable<{}>{
    return this.http.post(environment.apiUrl + '/about', {
      photo: link
    });
  }

  changeNames(firstName: string|undefined, lastName: string|undefined): Observable<{}>{
    return this.http.post(environment.apiUrl + '/about', { 
      firstName: firstName,
      lastName: lastName
     });
  }

  changeAbout(about: string): Observable<{}>{
    return this.http.post(environment.apiUrl + "/about", {
      about: about
    });
  }

  changeContact(email: string|undefined, phoneNumber: string|undefined): Observable<{}>{
    return this.http.post(environment.apiUrl + "/about", {
      email: email,
      phoneNumber: phoneNumber
    });
  }

}
