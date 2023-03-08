import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Output('confirm')
  confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() title = "Modal Title";
  @Input() body = "Modal Body";
  @Input() modalId = "";

  constructor(private ref: ElementRef) { }

  ngOnInit(): void {
    console.log(this.ref.nativeElement.getAttribute("data-bs-target"));
  }

  ok(){
    this.confirm.emit(true);
  }

  close(){
    this.confirm.emit(false);
  }

}
