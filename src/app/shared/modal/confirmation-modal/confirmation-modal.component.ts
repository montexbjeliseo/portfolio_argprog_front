import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  ok(){
    this.confirm.emit(true);
  }

  close(){
    this.confirm.emit(false);
  }

}
