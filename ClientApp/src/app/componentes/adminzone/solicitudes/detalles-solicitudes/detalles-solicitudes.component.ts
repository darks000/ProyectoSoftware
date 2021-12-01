import { Component, OnInit } from '@angular/core';
import { DetalleCotizacionService } from 'src/app/services/detalle-cotizacion.service'
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service'
import { Servicio } from 'src/app/models/servicio';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalles-solicitudes',
  templateUrl: './detalles-solicitudes.component.html',
  styleUrls: ['./detalles-solicitudes.component.css']
})
export class DetallesSolicitudesComponent implements OnInit {

  detalleCotizaciones: DetalleCotizacion[];
  stask: string;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private detalleCotizacionService: DetalleCotizacionService,
    private location: Location
  ) { }
  ngOnInit() {
    this.searchText = this.route.snapshot.paramMap.get('id');
    this.traerDetalles();
  }
  traerDetalles(){
    this.detalleCotizacionService.getAll().subscribe(detalles => this.detalleCotizaciones = detalles);   
  }
}
