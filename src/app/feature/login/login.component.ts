import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

import { Router } from '@angular/router';
import { UserLogin, AuthResponse } from 'src/app/shared/model/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: UserLogin = {
    username: "",
    password: ""
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user)
      .subscribe(res => {
        this.authService.setToken((res as AuthResponse).jwtToken);
        this.router.navigateByUrl('/');
      });
  }

}
