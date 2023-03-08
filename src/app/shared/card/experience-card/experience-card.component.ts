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

  @ViewChild("title") title!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("institution") institution!: ElementRef;
  @ViewChild("aboutInstitution") aboutInstitution!: ElementRef;

  backup: any = null;

  saved = false;
  editting = false;
  saving = false;

  @Input() index = "";

  constructor(private experienceService: ExperienceService, private ref: ElementRef) {
   }

  ngOnInit(): void {
    this.saved = this.data.id != null;
    this.index = this.ref.nativeElement.getAttribute('id');
  }

  delete(confirm: boolean) {
    /*let index = parseInt(this.ref.nativeElement.getAttribute('id'));
    console.log("Se procedió a eliminar elemento con id: " + index);
    if (confirm && this.data.id != null) {
      this.experienceService.delete(this.data.id).subscribe(res => {
        this.deleteEvent.emit(index);
      });
    } else if (confirm) {
      this.deleteEvent.emit(index);
    }*/
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

  edit() {
    this.backup = this.data;
    this.editting = true;
    this.saved = false;
  }

  save() {
    this.saving = true;
    this.data.title = this.title.nativeElement.innerText;
    this.data.description = this.description.nativeElement.innerText;
    this.data.institution = this.institution.nativeElement.innerText;
    this.data.aboutInstitution = this.aboutInstitution.nativeElement.innerText;
    this.editting = false;
    this.experienceService.save(this.data).subscribe(res => {
      this.backup = res;
      this.data = (res as Experience);
      this.reset();
      this.saved = true;
      this.saving = false;
      this.saveEvent.emit();
    });
  }

  reset() {
    this.title.nativeElement.innerText = this.backup.title;
    this.description.nativeElement.innerText = this.backup.description;
    this.institution.nativeElement.innerText = this.backup.institution;
    this.aboutInstitution.nativeElement.innerText = this.backup.aboutInstitution;
    this.editting = false;
    this.saved = this.data.id != null;
  }

}
