import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service'
import { Servicio } from 'src/app/models/servicio';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioModalComponent } from 'src/app/componentes/flotantes/servicio/servicio-modal/servicio-modal.component';

@Component({
  selector: 'app-consultar-servicio',
  templateUrl: './consultar-servicio.component.html',
  styleUrls: ['./consultar-servicio.component.css']
})
export class ConsultarServicioComponent implements OnInit {
  searchText: string;
  servicios: Servicio[];
  @Output() seleccionado = new EventEmitter<Servicio>();

  constructor(private servicioService: ServicioService,private authorizeService: AuthService,  private modalService: NgbModal) { }



  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.servicioService.getAll().subscribe(servicios => this.servicios = servicios);
    console.log(JSON.stringify(this.servicios))
  }

  open(){
    this.modalService.open(ServicioModalComponent, { size: 'lg' });
  }

  seleccionar(servicio: Servicio) {
    this.seleccionado.emit(servicio);
}
}
