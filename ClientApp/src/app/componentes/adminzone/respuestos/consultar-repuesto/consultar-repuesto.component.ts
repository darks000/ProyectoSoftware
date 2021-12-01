import { Component, OnInit } from '@angular/core';
import { RepuestoService } from 'src/app/services/repuesto.service'
import { Repuesto } from 'src/app/models/repuesto';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepuestosModalComponent } from 'src/app/componentes/flotantes/repuestos/repuestos-modal/repuestos-modal.component';

@Component({
  selector: 'app-consultar-repuesto',
  templateUrl: './consultar-repuesto.component.html',
  styleUrls: ['./consultar-repuesto.component.css']
})
export class ConsultarRepuestoComponent implements OnInit {
  searchText: string;
  repuestos: Repuesto[];
  constructor(private repuestoService: RepuestoService,private authorizeService: AuthService,  private modalService: NgbModal) { }


  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.repuestoService.getAll().subscribe(repuestos => this.repuestos = repuestos);
    console.log(JSON.stringify(this.repuestos))
  }

  
  open(){
    this.modalService.open(RepuestosModalComponent, { size: 'lg' });
  }
}
