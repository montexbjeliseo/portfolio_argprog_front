import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { SkillService } from '../../service/skill.service';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { Skill } from '../../model/model';
import { environment } from 'src/environments/environment';
import { alertError, alertSuccess, alertTheme } from '../../util/alerts';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {

  @Input() data!: Skill;

  @Output('delete')
  deleteEvent = new EventEmitter<number>();

  @ViewChild("name") name!: ElementRef;

  loading = false;

  constructor(private skillService: SkillService, private ref: ElementRef, public authService: AuthService) {}

  ngOnInit(): void {
  }

  delete() {
    let index = this.getIndex();
    Swal.fire({
      title: 'Estás seguro?',
      text: "Estas apunto de eliminar una educacion, deseas continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: alertTheme.confirmButtonColor,
      cancelButtonColor: alertTheme.cancelButtonColor,
      color: alertTheme.textColor,
      confirmButtonText: 'Sí, deseo continuar',
      background: alertTheme.background
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.data.id != null) {
          this.loading = true;
          this.skillService.delete(this.data.id).subscribe({
            next: (v)=>{
              this.loading = false;
              this.deleteEvent.emit(index);
              alertSuccess("La habilidad se eliminó correctamente!")
            },
            error: (err)=>{
              this.loading = false;
              alertError("Ocurrió un error, no se pudo eliminar la habilidad!")
            }
          });
        } else {
          this.deleteEvent.emit(index);
          alertSuccess("La habilidad se eliminó correctamente!")
        }
      }
    });
  }

  getIndex() {
    return parseInt(this.ref.nativeElement.getAttribute('id'));
  }

  edit() {
    let that = this;
    // Crea el HTML del formulario
    let name_id = `skill_name${this.getIndex()}`
    let level_id = `skill_level${this.getIndex()}`
    const form = `
      <form>
        <label>Nombre: </label>
        <br>
        <input type="text" id="${name_id}" value="${this.data.name}" required>
        <br>
        <label>Nivel:</label>
        <br>
        <select id="${level_id}" required>
          <option value="${this.data.level}">Selecciona un nivel</option>
          <option value="basico">Básico</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </form>
    `;

    // Muestra SweetAlert2 con el formulario personalizado
    Swal.fire({
      title: 'Editar habilidad',
      html: form,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      color: alertTheme.textColor,
      background: alertTheme.background,
      confirmButtonColor: alertTheme.confirmButtonColor,
      showCloseButton: true,
      preConfirm: () => {
        // Obtiene los valores del formulario
        const name = (document.getElementById(name_id) as HTMLInputElement).value;
        const level = (document.getElementById(level_id) as HTMLSelectElement).value;

        // Valida si los campos tienen un valor válido
        if (!name || !level) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
        } else {
          if(!environment.TITLE_PATTERN.test(name)){
            Swal.showValidationMessage('Nombre: solo se admiten letras números, espacios en blanco y ciertos caracteres especiales como - + * ?');
          }
        }

        // Retorna un objeto con los valores del formulario
        return { 
          id: this.data.id,
          name: name, 
          level: level 
        };
      }
    }).then((result) => {
      // Muestra los resultados obtenidos al enviar el formulario
      if (result.isConfirmed) {
        this.loading = true;
        this.skillService.save(result.value as Skill).subscribe({
          next: (v)=>{
            this.data = v as Skill;
            this.loading = false;
            alertSuccess("La habilidad se actualizó con éxito!");
          },
          error: (err)=>{
            this.loading = false;
            alertError("Ocurrió un error al intentar actualizar");
          }
        });
      }
    });
  }
}
