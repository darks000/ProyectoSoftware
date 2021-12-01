import { Component, OnInit } from '@angular/core';
import { Mecanico } from 'src/app/models/mecanico';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-mecanicos-list-modal',
  templateUrl: './mecanicos-list-modal.component.html',
  styleUrls: ['./mecanicos-list-modal.component.css']
})
export class MecanicosListModalComponent {

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(mecanico: Mecanico) {
    this.activeModal.close(mecanico);
  }

}
