import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { EducationService } from '../../service/education.service';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.css']
})
export class EducationCardComponent implements OnInit {
  
  @Input() data: any;

  @ViewChild("title") title!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("institution") institution!: ElementRef;
  @ViewChild("aboutInstitution") aboutInstitution!: ElementRef;

  backup: any = null;

  visible = true;
  editting = false;

  constructor(private educationService: EducationService) { }

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

  reset() {
    this.title.nativeElement.innerText = this.backup.title;
    this.description.nativeElement.innerText = this.backup.description;
    this.institution.nativeElement.innerText = this.backup.institution;
    this.aboutInstitution.nativeElement.innerText = this.backup.aboutInstitution;
    this.editting = false;
  }

}
