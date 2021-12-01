import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MecanicoService } from 'src/app/services/mecanico.service'
import { Mecanico } from 'src/app/models/mecanico';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MecanicoModalComponent } from 'src/app/componentes/flotantes/mecanico/mecanico-modal/mecanico-modal.component';


@Component({
  selector: 'app-consultar-mecanico',
  templateUrl: './consultar-mecanico.component.html',
  styleUrls: ['./consultar-mecanico.component.css']
})
export class ConsultarMecanicoComponent implements OnInit {
  searchText: string;
  mecanicos: Mecanico[];
  @Output() seleccionado = new EventEmitter<Mecanico>();

  constructor(private mecanicoService: MecanicoService,private authorizeService: AuthService,  private modalService: NgbModal) { }


  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.mecanicoService.getAll().subscribe(mecanicos => this.mecanicos = mecanicos);
    console.log(JSON.stringify(this.mecanicos))
  }

  open(){
    this.modalService.open(MecanicoModalComponent, { size: 'lg' });
  }
  seleccionar(mecanico: Mecanico) {
    this.seleccionado.emit(mecanico);
}

}
