import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() color!: string;
  @Input() mensaje!: string;
  @Output() alertVisibility = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  setAlertVisibility() {
    this.alertVisibility.emit(false);
  }

}
