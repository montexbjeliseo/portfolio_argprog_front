import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { alertError, alertSuccess, alertTheme } from '../../util/alerts';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {

  @Input() data: any;

  loading_photo_link = false;
  loading_names = false;
  loading_about = false;
  loading_contacts = false;

  constructor(public authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  changePhotoLink() {
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
      confirmButtonColor: alertTheme.confirmButtonColor,
      focusConfirm: false,
      color: alertTheme.textColor,
      background: alertTheme.background,
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
        this.loading_photo_link = true;
        this.dataService.changePhotoLink(result.value as string).subscribe({
          next: (v) => {
            this.data = v;
            alertSuccess("El enlace se actualizó correctamente");
            this.loading_photo_link = false;
          },
          error: (e) => {
            alertError(e as string);
            this.loading_photo_link = false;
          }
        });
      }
    });
  }

  changeNames() {
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
        <br>
        <label>Puesto/Especialización: </label>
        <br>
        <input type="text" id="profile_job_id" value="${this.data.job}" required>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar nombres y apellido/s, titular',
      html: changeNamesForm,
      confirmButtonText: 'Guardar',
      confirmButtonColor: alertTheme.confirmButtonColor,
      focusConfirm: false,
      color: alertTheme.textColor,
      background: alertTheme.background,
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const firstNameValue = (document.getElementById("profile_first_name_id") as HTMLInputElement).value;
        const lastNameValue = (document.getElementById("profile_last_name_id") as HTMLInputElement).value;
        const jobValue = (document.getElementById("profile_job_id") as HTMLInputElement).value;

        // Valida si los campos tienen un valor válido
        if (!firstNameValue || !lastNameValue || !jobValue) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
        } else if (!environment.FIRSTNAME_PATTERN.test(firstNameValue) ||
          !environment.LASTNAME_PATTERN.test(lastNameValue) ||
          !environment.DESCRIPTION_PATTERN) {
          Swal.showValidationMessage('Asegúrese de no haber ingresado caracteres especiales o números');
        }

        // Retorna un objeto con los valores del formulario
        return {
          firstName: firstNameValue,
          lastName: lastNameValue,
          job: jobValue
        }
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.loading_names = true;
        this.dataService.changeNames(result.value?.firstName, result.value?.lastName).subscribe({
          next: (v) => {
            this.data = v;
            alertSuccess("Los nombres se actualizaron correctamente");
            this.loading_names = false;
          },
          error: (e) => {
            alertError(e as string);
            this.loading_names = false;
          }
        });
      }
    });
  }

  editAbout() {
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
      confirmButtonColor: alertTheme.confirmButtonColor,
      focusConfirm: false,
      color: alertTheme.textColor,
      background: alertTheme.background,
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const aboutValue = (document.getElementById("profile_about_id") as HTMLInputElement).value;

        // Valida si los campos tienen un valor válido
        if(!aboutValue){
          Swal.showValidationMessage('El campo no puede estar vacío');
        } else if (!environment.DESCRIPTION_PATTERN.test(aboutValue)) {
          Swal.showValidationMessage('Asegúrese de no haber ingresado caracteres especiales');
        }

        // Retorna un objeto con los valores del formulario
        return aboutValue;
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.loading_about = true;
        this.dataService.changeAbout(result.value as string).subscribe({
          next: (v) => {
            this.loading_about = false;
            this.data = v;
            alertSuccess("\"Sobre mí\" se actualizó correctamente")
          },
          error: (e) => {
            alertError(e as string);
            this.loading_about = false;
          }
        });
      }
    });
  }

  changeContact() {
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
      confirmButtonColor: alertTheme.confirmButtonColor,
      focusConfirm: false,
      color: alertTheme.textColor,
      background: alertTheme.background,
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const emailValue = (document.getElementById("profile_email_id") as HTMLInputElement).value;
        const phoneNumberValue = (document.getElementById("profile_phone_number_id") as HTMLInputElement).value;

        // Valida si los campos tienen un valor válido
        if (!emailValue && !phoneNumberValue) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
        } else {
          if (!environment.EMAIL_PATTERN.test(emailValue)) {
            Swal.showValidationMessage('Formato de e-mail (\"example@mail.com\") inválido');
          }
          if (!environment.PHONE_NUMBER_PATTERN.test(phoneNumberValue)) {
            Swal.showValidationMessage('Formato de número telefónico (\"+000(0000)000000\") inválido');
          }
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
        this.loading_contacts = true;
        this.dataService.changeContact(result.value?.email, result.value?.phoneNumber).subscribe({
          next: (v) => {
            this.loading_contacts = false;
            this.data = v;
            alertSuccess("Los datos de contactos se actualizaron correctamente")
          },
          error: (e) => {
            this.loading_contacts = false;
            alertError("Ocurrió un error al intentar actualizar los datos!");
          }
        });
      }
    });
  }

}
