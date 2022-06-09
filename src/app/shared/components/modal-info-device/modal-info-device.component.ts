import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-device',
  templateUrl: './modal-info-device.component.html',
  styleUrls: ['./modal-info-device.component.scss'],
})
export class ModalInfoDeviceComponent {
  @Input() data;
  constructor(public modalController: ModalController) {}
  public closeModal(): void {
    this.modalController.dismiss();
  }
}
