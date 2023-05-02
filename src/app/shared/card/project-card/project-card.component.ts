import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/model';
import { AuthService } from '../../service/auth.service';
import { alertError, alertSuccess, alertTheme } from '../../util/alerts';
import { patterns } from 'src/app/utils/validation-patterns';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() data: any;

  @Output('delete')
  deleteEvent = new EventEmitter<number>();

  loading = false;

  constructor(private ref: ElementRef, private projectService: ProjectService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  getIndex() {
    return parseInt(this.ref.nativeElement.getAttribute('id'));
  }

  edit() {
    let that = this;
    // Crea el HTML del formulario
    let title_id = `project_title${this.getIndex()}`;
    let description_id = `project_description${this.getIndex()}`;
    let photo_id = `project_photo${this.getIndex()}`;
    let institution_id = `project_institution${this.getIndex()}`;
    let about_institution_id = `project_about_institution${this.getIndex()}`;
    const form = `
      <form>
        <label>Nombre del Proyecto: <input type="text" id="${title_id}" value="${this.data.title}" required></label>
        <label>Descripcion del Proyecto: <input type="text" id="${description_id}" value="${this.data.description}" required></label>
        <label>Foto del Proyecto: <input type="text" id="${photo_id}" value="${this.data.photo}" required></label>
        <label>Organizacion: <input type="text" id="${institution_id}" value="${this.data.institution}" required></label>
        <label>Acerca de la Organización: <input type="text" id="${about_institution_id}" value="${this.data.aboutInstitution}" required></label>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar Proyecto',
      html: form,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      confirmButtonColor: alertTheme.confirmButtonColor,
      color: alertTheme.textColor,
      background: alertTheme.background,
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
          Swal.showValidationMessage('Complete todos los campos requeridos');
        } else {
          if (!patterns.TITLE.test(title)) {
            Swal.showValidationMessage('Nombre: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!patterns.DESCRIPTION.test(description)) {
            Swal.showValidationMessage('Descripcion del Proyector: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!patterns.TITLE.test(institution)) {
            Swal.showValidationMessage('Equipo/Empresa: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!patterns.DESCRIPTION.test(about_institution)) {
            Swal.showValidationMessage('Descripcion de Equipo/Empresa: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
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
        this.projectService.save(result.value as Project).subscribe({
          next: (v) => {
            this.data = v as Project;
            this.loading = false;
            alertSuccess("El proyecto se actualizó exitosamente!");
          },
          error: (err) => {
            this.loading = false;
            alertError("Ocurrió un error al intentar actualizar los datos.")
          }
        });
      }
    });
  }
  delete() {
    let index = parseInt(this.ref.nativeElement.getAttribute('id'));
    Swal.fire({
      title: 'Estás seguro?',
      text: "Estás apunto de eliminar un proyecto. ¿Deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: alertTheme.confirmButtonColor,
      cancelButtonColor: alertTheme.cancelButtonColor,
      confirmButtonText: 'Sí, deseo continuar',
      background: alertTheme.background,
      color: alertTheme.textColor
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.data.id != null) {
          this.loading = true;
          this.projectService.delete(this.data.id).subscribe({
            next: (v) => {
              this.loading = false;
              this.deleteEvent.emit(index);
              alertSuccess("El proyecto se eliminó correctamente!");
            },
            error: (err) => {
              this.loading = false;
              alertError("Ocurrió un mientras se intentaba eliminar el proyecto!")
            }
          });
        } else {
          this.deleteEvent.emit(index);
          alertSuccess("El proyecto se eliminó correctamente!");
        }
      }
    });
  }
}
