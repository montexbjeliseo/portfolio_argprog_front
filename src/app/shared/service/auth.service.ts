import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }

	login(user: any) {
		return this.http.post(environment.apiUrl + '/api/auth/login', user);
	}
	setToken(token: string) {
		this.cookies.set('token', token);
	}
	getToken(): string {
		return this.cookies.get('token');
	}
	isLogged(): boolean {
		return this.getToken() != null;
	}

	getAuthHeader(): HttpHeaders {
		const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken()).set('Content-Type', 'application/json');
		return headers;
	}

	logout(){
		this.cookies.delete('token');
		this.router.navigate(['/']);
	}
}
