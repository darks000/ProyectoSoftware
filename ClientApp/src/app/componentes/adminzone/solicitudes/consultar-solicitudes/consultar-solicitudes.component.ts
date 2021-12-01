import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service'
import { Cotizacion } from 'src/app/models/cotizacion';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CotizacionModalComponent } from 'src/app/componentes/flotantes/cotizacionCliente/cotizacion-modal/cotizacion-modal.component';

@Component({
  selector: 'app-consultar-solicitudes',
  templateUrl: './consultar-solicitudes.component.html',
  styleUrls: ['./consultar-solicitudes.component.css']
})
export class ConsultarSolicitudesComponent implements OnInit {

  searchText: string;
  cotizaciones: Cotizacion[];
  constructor(private cotizacionService: CotizacionService,private authorizeService: AuthService,  private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.cotizacionService.getAll().subscribe(cotizaciones => this.cotizaciones = cotizaciones);
    console.log(JSON.stringify(this.cotizaciones))
  }

  userName(): string {
    return this.authorizeService.getUserName();
  }

}
