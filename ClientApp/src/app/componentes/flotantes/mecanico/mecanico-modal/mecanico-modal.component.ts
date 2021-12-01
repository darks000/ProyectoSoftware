import { Component, OnInit } from '@angular/core';
import { Mecanico } from 'src/app/models/mecanico';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mecanico-modal',
  templateUrl: './mecanico-modal.component.html',
  styleUrls: ['./mecanico-modal.component.css']
})
export class MecanicoModalComponent {

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(mecanico: Mecanico) {
    this.activeModal.close(mecanico);
  }

}
