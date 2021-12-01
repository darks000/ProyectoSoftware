import { Component } from '@angular/core';
import { Cotizacion } from 'src/app/models/cotizacion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cotizacion-modal',
  templateUrl: './cotizacion-modal.component.html',
  styleUrls: ['./cotizacion-modal.component.css']
})
export class CotizacionModalComponent{

  constructor(public activeModal: NgbActiveModal) { }

  actualizar(cotizacion: Cotizacion) {
    this.activeModal.close(cotizacion);
  }


}
