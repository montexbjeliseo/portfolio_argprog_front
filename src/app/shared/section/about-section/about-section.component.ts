import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {

  @Input() data: any;

  edittingName = false;
  edittingAbout = false;
  edittingContact = false;

  @ViewChild("firstName") firstNameBox!: ElementRef;
  @ViewChild("lastName") lastNameBox!: ElementRef;

  @ViewChild("aboutMe") aboutMe!: ElementRef;

  @ViewChild("email") email!: ElementRef;
  @ViewChild("phoneNumber") phoneNumber!: ElementRef;

  constructor(public authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  editName(){
    this.edittingName = true;
  }

  changePhotoLink(){
    let that = this;
    // Crea el HTML del formulario
    const form = `
      <form>
        <label>Enlace: </label>
        <br>
        <input type="text" id="photo_link_id" value="${this.data.photo}" required>
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
        this.dataService.changePhotoLink(result.value as string).subscribe(res=>{
          this.data = res;
        },
        error =>{
          console.log("Error", error);
        });
      }
    });
  }

  getPhotoLink():string {
    return this.data.photo ?? 'assets/img/profile.png';
  }

  saveName(){
    this.edittingName = false;
    this.dataService.changeName(
      this.firstNameBox.nativeElement.innerText, 
      this.lastNameBox.nativeElement.innerText
      ).subscribe({
        next: (v) => {
          //It is all ok
        },
        error: (e) => {
          this.alertError();
        }
      });
  }

  resetName(){
    this.edittingName = false;
  }

  editAbout(){
    this.edittingAbout = true;
  }

  saveAbout(){
    this.edittingAbout = false;
    this.dataService.changeAbout(this.aboutMe.nativeElement.innerText).subscribe({
      next: (v) => {
        //It is all ok
      },
      error: (e) => {
        this.alertError();
      }
    });
  }

  alertError(){
    Swal.fire(
      'Error',
      'Ocurrió un error',
      'warning'
    );
  }

  resetAbout(){
    this.edittingAbout = false;
  }

  editContact(){
    this.edittingContact = true;
  }

  resetContact(){
    this.edittingContact = false;
  }

  saveContact(){
    this.edittingContact = false;
    this.dataService.changeContact(this.email.nativeElement.innerText, this.phoneNumber.nativeElement.innerText).subscribe({
      next: (v) => {
        //It is all ok
      },
      error: (e) => {
        this.alertError();
      }
    })
  }

}
