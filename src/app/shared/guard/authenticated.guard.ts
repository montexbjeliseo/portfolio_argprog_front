import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) { }

	canActivate(): boolean {
		if (this.authService.isLogged()) {
			this.router.navigate(['/']);
			return false;
		}
		return true;
	}

}
