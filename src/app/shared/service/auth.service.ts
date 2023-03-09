import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }

	login(user: any) {
		return this.http.post('http://localhost:8080/api/auth/login', user);
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
		/*headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Credentials', 'true');*/
		return headers;
	}

	logout(){
		this.cookies.delete('token');
		this.router.navigate(['/']);
	}
}
