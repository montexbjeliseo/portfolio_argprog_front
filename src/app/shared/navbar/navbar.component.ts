import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { alertError, alertSuccess, alertTheme } from '../util/alerts';
import { AuthResponse, UserLogin } from '../model/model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() data!: any;

  waiting_for_login = false;

  user: UserLogin = {
    username: "",
    password: ""
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  login() {
    const login_form = `
      <form>
        <label>Correo electrónico: </label>
        <br>
        <input type="text" id="username_id" value="" placeholder="Ingrese su correo" required>
        <br>
        <label>Contraseña: </label>
        <br>
        <input type="password" id="password_id" value="" placeholder="Ingrese su contraseña" required>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Iniciar sesión',
      html: login_form,
      confirmButtonText: 'Iniciar',
      confirmButtonColor: alertTheme.confirmButtonColor,
      focusConfirm: false,
      color: alertTheme.textColor,
      background: alertTheme.background,
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const username = (document.getElementById("username_id") as HTMLInputElement).value;
        const password = (document.getElementById("password_id") as HTMLSelectElement).value;

        // Valida si los campos tienen un valor válido
        if (!username || !password) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
        } else {
          if (!environment.EMAIL_PATTERN.test(username)) {
            Swal.showValidationMessage('Correo: formato de correo electrónico inválido!');
          }
        }

        // Retorna un objeto con los valores del formulario
        return {
          username: username,
          password: password
        };
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        // Intentar iniciar
        if (!this.authService.getToken()) {
          this.waiting_for_login = true;
          this.authService.login({
            username: result.value?.username,
            password: result.value?.password
          }).subscribe({
            next: (v) => {
              this.waiting_for_login = false;
              this.authService.setToken((v as AuthResponse).jwtToken);
              alertSuccess("Se inició sesión con éxito!");
            },
            error: (err) => {
              this.waiting_for_login = false;
              alertError("Correo y/o contraseña inválidos, falló al iniciar sesión");
            }
          });
        }
      }
    });
  }

  logout() {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Estás apunto de cerrar sesión. ¿Deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: alertTheme.confirmButtonColor,
      cancelButtonColor: alertTheme.cancelButtonColor,
      confirmButtonText: 'Sí, deseo cerrar sesión',
      color: alertTheme.textColor,
      background: alertTheme.background
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }

}