import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service'
import { Vehiculo } from 'src/app/models/vehiculo';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculoModalComponent } from 'src/app/componentes/flotantes/vehiculo/vehiculo-modal/vehiculo-modal.component';


@Component({
  selector: 'app-consultar-vehiculo',
  templateUrl: './consultar-vehiculo.component.html',
  styleUrls: ['./consultar-vehiculo.component.css']
})
export class ConsultarVehiculoComponent implements OnInit {
  searchText: string;
  vehiculos: Vehiculo[];
  @Output() seleccionado = new EventEmitter<Vehiculo>();
  constructor(private vehiculoService: VehiculoService,private authorizeService: AuthService,  private modalService: NgbModal) { }

  ngOnInit() {
    this.searchText = this.userName();
    this.getAll();
  }

  getAll() {
    this.vehiculoService.getAll().subscribe(mecanicos => this.vehiculos = mecanicos);
    console.log(JSON.stringify(this.vehiculos))
  }

  userName(): string {
    return this.authorizeService.getUserName();
  }

  open(){
    this.modalService.open(VehiculoModalComponent, { size: 'lg' });
  }

  seleccionar(vehiculo: Vehiculo) {
    this.seleccionado.emit(vehiculo);
}
}
