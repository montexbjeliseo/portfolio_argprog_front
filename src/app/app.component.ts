import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre: string = '';
  telefono = '';
  dni = '';

  cambiaDni(valor : string) {
    // Podes consultar el valor por consola
    console.log(valor);
    this.dni = valor;
  }

  onClick() {
    alert('Hiciste click!!');
  }
}
