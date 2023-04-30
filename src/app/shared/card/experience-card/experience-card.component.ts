import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Experience } from '../../model/model';
import { ExperienceService } from '../../service/experience.service';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { alertError, alertSuccess } from '../../util/alerts';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCardComponent implements OnInit {

  @Output('delete')
  deleteEvent = new EventEmitter<number>();
  @Output('save')
  saveEvent = new EventEmitter();

  @Input() id!: number;
  @Input() data!: Experience;

  loading = false;

  constructor(private experienceService: ExperienceService, private ref: ElementRef, public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  delete(confirm: boolean) {
    let index = parseInt(this.ref.nativeElement.getAttribute('id'));
    Swal.fire({
      title: 'Estás seguro?',
      text: "Estas apunto de eliminar una experiencia, deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo continuar',
      background: "rgba(33, 37, 41)"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.data.id != null) {
          this.loading = true;
          this.experienceService.delete(this.data.id).subscribe({
            next: (v) => {
              this.deleteEvent.emit(index);
              this.loading = false;
              alertSuccess("La experiencia se eliminó correctamente!");
            },
            error: (err) => {
              alertError("Ocurrió un error al intentar eliminar experiencia!");
            }
          });
        } else {
          this.deleteEvent.emit(index);
          alertSuccess("La experiencia se eliminó correctamente!");
        }
      }
    });
  }

  getIndex() {
    return parseInt(this.ref.nativeElement.getAttribute('id'));
  }

  edit() {
    // Crea el HTML del formulario
    let title_id = `experience_title${this.getIndex()}`;
    let description_id = `experience_description${this.getIndex()}`;
    let photo_id = `experience_photo${this.getIndex()}`;
    let institution_id = `experience_institution${this.getIndex()}`;
    let about_institution_id = `experience_about_institution${this.getIndex()}`;

    const form = `
      <form>
        <label>Nombre del Puesto: <input type="text" id="${title_id}" value="${this.data.title}" required></label>
        <label>Descripcion del Puesto: <input type="text" id="${description_id}" value="${this.data.description}" required></label>
        <label>Foto relacionada: <input type="text" id="${photo_id}" value="${this.data.photo??''}" required></label>
        <label>Organizacion: <input type="text" id="${institution_id}" value="${this.data.institution}" required></label>
        <label>Acerca de la Organización: <input type="text" id="${about_institution_id}" value="${this.data.aboutInstitution}" required></label>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar Experiencia',
      html: form,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      background: "rgba(33, 37, 41)",
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const title = (document.getElementById(title_id) as HTMLInputElement).value;
        const description = (document.getElementById(description_id) as HTMLSelectElement).value;
        const photo = (document.getElementById(photo_id) as HTMLSelectElement).value;
        const institution = (document.getElementById(institution_id) as HTMLSelectElement).value;
        const about_institution = (document.getElementById(about_institution_id) as HTMLSelectElement).value;

        // Valida si los campos tienen un valor válido
        if (!title || !description || !institution || !about_institution) {
          Swal.showValidationMessage('Complete todos los campos requeridos. Foto es opcional');
        } else {
          if (!environment.TITLE_PATTERN.test(title)) {
            Swal.showValidationMessage('Puesto: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!environment.DESCRIPTION_PATTERN.test(description)) {
            Swal.showValidationMessage('Descripción del puesto: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!environment.TITLE_PATTERN.test(institution)) {
            Swal.showValidationMessage('Empresa: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!environment.DESCRIPTION_PATTERN.test(about_institution)) {
            Swal.showValidationMessage('Descripcion de la Empresa: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (photo) {

          }
        }

        // Retorna un objeto con los valores del formulario
        return {
          id: this.data.id,
          title: title,
          description: description,
          photo: photo,
          institution: institution,
          aboutInstitution: about_institution,
          indexPosition: 0
        };
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.loading = true;
        this.experienceService.save(result.value as Experience).subscribe({
          next: (v) => {
            this.data = v as Experience;
            this.loading = false;
            alertSuccess("Los datos se actualizaron correctamente");
          },
          error: (error) => {
            this.loading = false;
            alertError("Ocurrió un error");
          }
        });
      }
    });
  }
}
