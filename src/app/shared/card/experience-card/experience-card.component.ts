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
        if (this.data.id != null){
          this.experienceService.delete(this.data.id).subscribe(res => {
            //Ignore?
          });
        }
        this.deleteEvent.emit(index);
      }
    });
  }

  getIndex(){
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
        <label>Foto relacionada: <input type="text" id="${photo_id}" value="${this.data.photo}" required></label>
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
      preConfirm: () => {
        // Obtiene los valores del formulario
        const title = (document.getElementById(title_id) as HTMLInputElement).value;
        const description = (document.getElementById(description_id) as HTMLSelectElement).value;
        const photo = (document.getElementById(photo_id) as HTMLSelectElement).value;
        const institution = (document.getElementById(institution_id) as HTMLSelectElement).value;
        const about_institution = (document.getElementById(about_institution_id) as HTMLSelectElement).value;

        // Valida si los campos tienen un valor válido
        if (!title || !description) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
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
        this.experienceService.save(result.value as Experience).subscribe({next: (v)=>{
          this.data = v as Experience;
          this.alertSuccess("Los datos se actualizaron correctamente")
        },
        error: (error) =>{
          this.alertError("Ocurrió un error");
        }});
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

}
