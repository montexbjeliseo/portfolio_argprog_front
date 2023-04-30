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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo continuar',
      background: "rgba(33, 37, 41)"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.data.id != null) {
          this.skillService.delete(this.data.id).subscribe(res => {
            //Ignore?
          });
        }
        this.deleteEvent.emit(index);
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
      background: "rgba(33, 37, 41)",
      preConfirm: () => {
        // Obtiene los valores del formulario
        const name = (document.getElementById(name_id) as HTMLInputElement).value;
        const level = (document.getElementById(level_id) as HTMLSelectElement).value;

        // Valida si los campos tienen un valor válido
        if (!name || !level) {
          Swal.showValidationMessage('Complete todos los campos requeridos');
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
        this.skillService.save(result.value as Skill).subscribe(
        res=>{
          this.data = res as Skill;
        },
        error =>{
          console.log("Error", error);
        });
      }
    });
  }
}
