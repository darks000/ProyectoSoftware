import { ActivatedRoute } from '@angular/router';
import { CotizacionService } from 'src/app/services/cotizacion.service'
import { Cotizacion } from 'src/app/models/cotizacion';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DetalleCotizacionService } from 'src/app/services/detalle-cotizacion.service'
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { MecanicosListModalComponent } from 'src/app/componentes/flotantes/mecnaico/mecanicos-list-modal/mecanicos-list-modal.component';
import { MecanicoService } from 'src/app/services/mecanico.service'
import { Mecanico } from 'src/app/models/mecanico';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-responder-solicitudes',
  templateUrl: './responder-solicitudes.component.html',
  styleUrls: ['./responder-solicitudes.component.css']
})
export class ResponderSolicitudesComponent implements OnInit {

  cotizacion: Cotizacion;
  stask: string;
  detalleCotizaciones: DetalleCotizacion[];
  searchText: string;
  idMeca:string;
  constructor(
    private route: ActivatedRoute,
    private cotizacionService: CotizacionService,
    private modalService: NgbModal,
    private mecanicoService: MecanicoService,
    private detalleCotizacionService: DetalleCotizacionService,
    private location: Location
  ) { }
  ngOnInit() {
    this.get();
    this.searchText = this.route.snapshot.paramMap.get('id');
    this.traerDetalles();
  }
  get(): void {
    const id =
      this.route.snapshot.paramMap.get('id');
    this.cotizacionService.get(id)
      .subscribe(hero => this.cotizacion = hero);
  }
  update(): void {
    this.cotizacionService.update(this.cotizacion)
      .subscribe(() => this.goBack());
  }
  traerDetalles(){
    this.detalleCotizacionService.getAll().subscribe(detalles => this.detalleCotizaciones = detalles);   
  }
  goBack(): void {
    this.location.back;
  }

  buscarMecanico() {
    this.mecanicoService.get(this.idMeca).subscribe(mecanico => {
      if (mecanico != null) {
        this.cotizacion.idMecanico = mecanico.identificacion;
      }
      else {
        this.openModalMecanico();
      }
    });
  }

  openModalMecanico() {
    this.modalService.open(MecanicosListModalComponent, { size: 'lg' }).result.then((mecanico) => this.actualizar(mecanico));
  }

  actualizar(mecanico: Mecanico) {
    this.cotizacion.idMecanico = mecanico.identificacion;
  }
}
