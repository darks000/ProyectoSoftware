import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-vehiculo-modal',
  templateUrl: './vehiculo-modal.component.html',
  styleUrls: ['./vehiculo-modal.component.css']
})
export class VehiculoModalComponent{

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(vehiculo: Vehiculo) {
    this.activeModal.close(vehiculo);
  }

}
