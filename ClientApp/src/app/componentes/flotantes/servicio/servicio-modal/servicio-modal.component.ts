import { Component } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-servicio-modal',
  templateUrl: './servicio-modal.component.html',
  styleUrls: ['./servicio-modal.component.css']
})
export class ServicioModalComponent{

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(servicio: Servicio) {
    this.activeModal.close(servicio);
  }

}
