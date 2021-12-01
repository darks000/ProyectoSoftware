import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service'
import { Cotizacion } from 'src/app/models/cotizacion';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CotizacionModalComponent } from 'src/app/componentes/flotantes/cotizacionCliente/cotizacion-modal/cotizacion-modal.component';

@Component({
  selector: 'app-consultar-cotizacion',
  templateUrl: './consultar-cotizacion.component.html',
  styleUrls: ['./consultar-cotizacion.component.css']
})
export class ConsultarCotizacionComponent implements OnInit {
  searchText: string;
  cotizaciones: Cotizacion[];
  constructor(private cotizacionService: CotizacionService,private authorizeService: AuthService,  private modalService: NgbModal) { }

  ngOnInit() {
    this.searchText = this.userName();
    this.getAll();
  }

  getAll() {
    this.cotizacionService.getAll().subscribe(cotizaciones => this.cotizaciones = cotizaciones);
    console.log(JSON.stringify(this.cotizaciones))
  }

  userName(): string {
    return this.authorizeService.getUserName();
  }

  open(){
    this.modalService.open(CotizacionModalComponent, { size: 'lg' });
  }
}
