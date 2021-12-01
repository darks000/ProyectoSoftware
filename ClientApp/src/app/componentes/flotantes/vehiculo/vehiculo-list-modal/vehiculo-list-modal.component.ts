import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehiculo-list-modal',
  templateUrl: './vehiculo-list-modal.component.html',
  styleUrls: ['./vehiculo-list-modal.component.css']
})
export class VehiculoListModalComponent{

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(vehiculo: Vehiculo) {
    this.activeModal.close(vehiculo);
  }
}
