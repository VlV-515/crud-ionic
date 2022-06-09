import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-type-device',
  templateUrl: './modal-type-device.component.html',
  styleUrls: ['./modal-type-device.component.scss'],
})
export class ModalTypeDeviceComponent {
  @Input() data;
  constructor(public modalController: ModalController) {}
  public closeModal(): void {
    this.modalController.dismiss();
  }
}
