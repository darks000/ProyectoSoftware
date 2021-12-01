import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-servicios-list-modal',
  templateUrl: './servicios-list-modal.component.html',
  styleUrls: ['./servicios-list-modal.component.css']
})
export class ServiciosListModalComponent{

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(servicio: Servicio) {
    this.activeModal.close(servicio);
  }

}
