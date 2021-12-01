import { Component, OnInit } from '@angular/core';
import { Repuesto } from 'src/app/models/repuesto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-repuestos-modal',
  templateUrl: './repuestos-modal.component.html',
  styleUrls: ['./repuestos-modal.component.css']
})
export class RepuestosModalComponent {

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(repuesto: Repuesto) {
    this.activeModal.close(repuesto);
  }

}
