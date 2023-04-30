import { 
  Component, 
  OnInit, 
  Input,
  ElementRef,
  EventEmitter,
  Output 
} from '@angular/core';
import { EducationService } from '../../service/education.service';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { alertError, alertSuccess, alertTheme } from '../../util/alerts';
import { environment } from 'src/environments/environment';
import { Education } from '../../model/model';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.css']
})
export class EducationCardComponent implements OnInit {
  
  @Output('delete')
  deleteEvent = new EventEmitter<number>();
  @Output('save')
  saveEvent = new EventEmitter();

  @Input() data: any;

  loading = false;

  constructor(private educationService: EducationService, private ref: ElementRef, public authService: AuthService) { }

  ngOnInit(): void {
  }

  getIndex() {
    return parseInt(this.ref.nativeElement.getAttribute('id'));
  }

  edit() {
    // Crea el HTML del formulario
    let title_id = `ed_title${this.getIndex()}`;
    let description_id = `_description${this.getIndex()}`;
    let photo_id = `ed_photo${this.getIndex()}`;
    let institution_id = `ed_institution${this.getIndex()}`;
    let about_institution_id = `ed_about_institution${this.getIndex()}`;

    const form = `
      <form>
        <label>Titulo/Carrera: <input type="text" id="${title_id}" value="${this.data.title}" required></label>
        <label>Descripcion Titulo/Carrera: <input type="text" id="${description_id}" value="${this.data.description}" required></label>
        <label>Foto relacionada: <input type="text" id="${photo_id}" value="${this.data.photo}" required></label>
        <label>Institución: <input type="text" id="${institution_id}" value="${this.data.institution}" required></label>
        <label>Acerca de la Institución: <input type="text" id="${about_institution_id}" value="${this.data.aboutInstitution}" required></label>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar Educación',
      html: form,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      color: alertTheme.textColor,
      confirmButtonColor: alertTheme.confirmButtonColor,
      cancelButtonColor: alertTheme.cancelButtonColor,
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
          Swal.showValidationMessage('Complete todos los campos requeridos. Foto es opcional');
        } else {
          if (!environment.TITLE_PATTERN.test(title)) {
            Swal.showValidationMessage('Titulo/Carrera: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!environment.DESCRIPTION_PATTERN.test(description)) {
            Swal.showValidationMessage('Descripción Titulo/Carrera: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!environment.TITLE_PATTERN.test(institution)) {
            Swal.showValidationMessage('Institución: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if (!environment.DESCRIPTION_PATTERN.test(about_institution)) {
            Swal.showValidationMessage('Descripcion de la Institución: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          } else if(photo){

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
        this.educationService.save(result.value as Education).subscribe({
          next: (v) => {
            this.data = v as Education;
            alertSuccess("Los datos de Educación se actualizaron correctamente");
            this.loading = false;
          },
          error: (error) => {
            alertError("Ocurrió un error");
          }
        });
      }
    });
  }

  delete(confirm: boolean) {
    let index = parseInt(this.ref.nativeElement.getAttribute('id'));
    Swal.fire({
      title: 'Estás seguro?',
      text: "Estas apunto de eliminar una educacion, ¿deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: alertTheme.confirmButtonColor,
      cancelButtonColor: alertTheme.cancelButtonColor,
      confirmButtonText: 'Sí, deseo continuar',
      color: alertTheme.textColor,
      background: alertTheme.background
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.data.id != null){
          this.loading = true;
          this.educationService.delete(this.data.id).subscribe(res => {
            alertSuccess("La educación se eliminó con éxito!");
            this.deleteEvent.emit(index);
            this.loading = false;
          });
        } else {
          this.deleteEvent.emit(index);
        }
      }
    });
  }
}
