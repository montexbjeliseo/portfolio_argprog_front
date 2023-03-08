import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {

  constructor(private ref: ElementRef) { }

  ngOnInit(): void {
    console.log(this.ref.nativeElement.getAttribute('data-bs-target'));
  }

}
