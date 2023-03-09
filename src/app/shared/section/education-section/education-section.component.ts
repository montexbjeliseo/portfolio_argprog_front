import { Component, OnInit, Input } from '@angular/core';
import { Education } from '../../model/model';
import { EducationSample } from '../../model/sample';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent implements OnInit {

  @Input() data!: Education[];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  add() {
    this.data.push(EducationSample);
  }
  
  delete(index: number) {
    this.data.splice(index, 1);
  }
}
