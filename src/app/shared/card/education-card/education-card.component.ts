import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild, 
  ElementRef,
  EventEmitter,
  Output 
} from '@angular/core';
import { EducationService } from '../../service/education.service';
import Swal from 'sweetalert2';

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

  @ViewChild("title") title!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("institution") institution!: ElementRef;
  @ViewChild("aboutInstitution") aboutInstitution!: ElementRef;

  backup: any = null;

  visible = true;
  editting = false;

  constructor(private educationService: EducationService, private ref: ElementRef) { }

  ngOnInit(): void {
  }

  edit() {
    this.backup = this.data;
    this.editting = true;
  }

  save() {
    this.data.title = this.title.nativeElement.innerText;
    this.data.description = this.description.nativeElement.innerText;
    this.data.institution = this.institution.nativeElement.innerText;
    this.data.aboutInstitution = this.aboutInstitution.nativeElement.innerText;
    this.editting = false;
    this.educationService.save(this.data).subscribe(res => {
      this.backup = res;
      this.data = res;
      this.reset();
    });
  }

  hide() {
    this.visible = false;
  }

  delete(confirm: boolean) {
    let index = parseInt(this.ref.nativeElement.getAttribute('id'));
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
        if (this.data.id != null){
          this.educationService.delete(this.data.id).subscribe(res => {
            //Ignore?
          });
        }
        this.deleteEvent.emit(index);
      }
    });
  }

  reset() {
    this.title.nativeElement.innerText = this.backup.title;
    this.description.nativeElement.innerText = this.backup.description;
    this.institution.nativeElement.innerText = this.backup.institution;
    this.aboutInstitution.nativeElement.innerText = this.backup.aboutInstitution;
    this.editting = false;
  }

}
