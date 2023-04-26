import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {

  DESCRIPTION_PATTERN = /^[a-zA-ZÀ-ÿ0-9+\*\?\¿\¡\!\.\"s:\-*@\\\/%=#\$\|<>\(\)\[\]\^,&'\n]*$/;

  @Input() data: any;

  constructor(public authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  changePhotoLink(){
    // Crea el HTML del formulario
    const changePhotoLinkForm = `
      <form>
        <label>Enlace: </label>
        <br>
        <input type="text" id="photo_link_id" value="${this.data.photo}" required>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar enlace de foto de perfil',
      html: changePhotoLinkForm,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      background: "rgba(33, 37, 41)",
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const photo_link = (document.getElementById("photo_link_id") as HTMLInputElement).value;

        // Valida si los campos tienen un valor válido
        if (!photo_link) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
        }

        // Retorna un objeto con los valores del formulario
        return photo_link;
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.dataService.changePhotoLink(result.value as string).subscribe({
          next: (v) => {
            this.data = v;
            this.alertSuccess("El enlace se actualizó correctamente")
          },
          error: (e) => {
            this.alertError(e as string);
          }
        });
      }
    });
  }

  changeNames(){
    // Crea el HTML del formulario
    const changeNamesForm = `
      <form>
        <label>Nombres: </label>
        <br>
        <input type="text" id="profile_first_name_id" value="${this.data.firstName}" required>
        <br>
        <label>Apellido/s: </label>
        <br>
        <input type="text" id="profile_last_name_id" value="${this.data.lastName}" required>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar nombres y apellido/s',
      html: changeNamesForm,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      background: "rgba(33, 37, 41)",
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const firstNameValue = (document.getElementById("profile_first_name_id") as HTMLInputElement).value;
        const lastNameValue = (document.getElementById("profile_last_name_id") as HTMLInputElement).value;

        // Valida si los campos tienen un valor válido
        if (!firstNameValue&&!lastNameValue) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
        }

        // Retorna un objeto con los valores del formulario
        return {
          firstName: firstNameValue,
          lastName: lastNameValue
        }
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.dataService.changeNames(result.value?.firstName, result.value?.lastName).subscribe({
          next: (v) => {
            this.data = v;
            this.alertSuccess("Los nombres se actualizaron correctamente")
          },
          error: (e) => {
            this.alertError(e as string);
          }
        });
      }
    });
  }

  editAbout(){
    // Crea el HTML del formulario
    const changeAboutForm = `
      <form>
        <label>Sobre mí: </label>
        <br>
        <textarea type="text" id="profile_about_id" rows="5" cols="50" required>${this.data.about}</textarea>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar sobre mí',
      html: changeAboutForm,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      background: "rgba(33, 37, 41)",
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const aboutValue = (document.getElementById("profile_about_id") as HTMLInputElement).value;
        
        // Valida si los campos tienen un valor válido
        if (!this.DESCRIPTION_PATTERN.test(aboutValue)) {
          Swal.showValidationMessage('Asegúrese de no haber ingresado caracteres especiales');
        }

        // Retorna un objeto con los valores del formulario
        return aboutValue;
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.dataService.changeAbout(result.value as string).subscribe({
          next: (v) => {
            this.data = v;
            this.alertSuccess("\"Sobre mí\" se actualizó correctamente")
          },
          error: (e) => {
            this.alertError(e as string);
          }
        });
      }
    });
  }

  alertError(msg: string){
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'warning',
      background: "rgba(33, 37, 41)"
    });
  }

  alertSuccess(msg: string){
    Swal.fire(
      {
        title: 'Operación exitosa!',
        text: msg,
        icon: 'success',
        background: "rgba(33, 37, 41)"
      });
  }

  changeContact(){
    // Crea el HTML del formulario
    const changeContactForm = `
      <form>
        <label>Correo: </label>
        <br>
        <input type="email" id="profile_email_id" value="${this.data.email}" required>
        <br>
        <label>Número de teléfono: </label>
        <br>
        <input type="text" id="profile_phone_number_id" value="${this.data.phoneNumber}" required>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar email y telefono',
      html: changeContactForm,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      background: "rgba(33, 37, 41)",
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const emailValue = (document.getElementById("profile_email_id") as HTMLInputElement).value;
        const phoneNumberValue = (document.getElementById("profile_phone_number_id") as HTMLInputElement).value;

        // Valida si los campos tienen un valor válido
        if (!emailValue&&!phoneNumberValue) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
        }

        // Retorna un objeto con los valores del formulario
        return {
          email: emailValue,
          phoneNumber: phoneNumberValue
        }
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.dataService.changeContact(result.value?.email, result.value?.phoneNumber).subscribe({
          next: (v) => {
            this.data = v;
            this.alertSuccess("Los datos de contactos se actualizaron correctamente")
          },
          error: (e) => {
            this.alertError(e.error.email??'' + '\n' + +e.error.phoneNumber??'');
            console.log(e);
          }
        });
      }
    });
  }

}
