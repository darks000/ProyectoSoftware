import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service'
import { Cotizacion } from 'src/app/models/cotizacion';
import { VehiculoService } from 'src/app/services/vehiculo.service'
import { Vehiculo } from 'src/app/models/vehiculo';
import { DetalleCotizacionService } from 'src/app/services/detalle-cotizacion.service'
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
import { ServicioService } from 'src/app/services/servicio.service'
import { Servicio } from 'src/app/models/servicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { VehiculoListModalComponent } from 'src/app/componentes/flotantes/vehiculo/vehiculo-list-modal/vehiculo-list-modal.component';
import { ServiciosListModalComponent } from 'src/app/componentes/flotantes/servicios/servicios-list-modal/servicios-list-modal.component';

@Component({
  selector: 'app-registrar-cotizacion',
  templateUrl: './registrar-cotizacion.component.html',
  styleUrls: ['./registrar-cotizacion.component.css']
})
export class RegistrarCotizacionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  contador:number;
  searchText: string;
  codigoNuevo: string;
  constructor(
    private cotizacionService: CotizacionService,
    private servicioService: ServicioService,
    private detalleCotizacionService: DetalleCotizacionService,
    private vehiculoService: VehiculoService,
    private authService: AuthService, 
    private modalService: NgbModal,
     private formBuilder: FormBuilder) { }
  cotizacion:Cotizacion;
  cotizacions:Cotizacion[];
  detalleCotizacion:DetalleCotizacion;
  detalleCotizaciones:DetalleCotizacion[];
  servicio:Servicio;
  totalPago:number;
  ngOnInit() {
    this.searchText = this.codigoNuevo;
    this.cotizacion = new Cotizacion();
    this.detalleCotizacion = new DetalleCotizacion();
    
    this.registerForm = this.formBuilder.group({
      codigoCotizacion: [this.cotizacion.codigoCotizacion =  this.codigoNuevo],
      codigoPropietario: [this.cotizacion.codigoPropietario  = this.userName()],
      placaVehiculo: [this.cotizacion.placaVehiculo, Validators.required],
      codigoCotizacion1: [this.detalleCotizacion.codigoCotizacion = this.codigoNuevo],
      codigoServicio: [this.detalleCotizacion.codigoServicio, Validators.required],
      valorServicio: [this.detalleCotizacion.valorServicio, Validators.required],
      descripcion: [this.detalleCotizacion.descripcion, Validators.required],
      valorAproximado: [this.cotizacion.valorAproximado=0],
      valorFinal: [this.cotizacion.valorFinal=0],
      idMecanico: [this.cotizacion.idMecanico = "NO ASIGNADO"],
      comentario: [this.cotizacion.comentario = "NO INGRESADO"],
      estado: [this.cotizacion.estado = "EN COTIZACION"]
    });
  }

  userName(): string {
    return this.authService.getUserName();
  }

  get f() { return this.registerForm.controls; }

  buscarVehiculo() {
    this.vehiculoService.get(this.registerForm.value.placaVehiculo).subscribe(vehiculo => {
      if (vehiculo != null) {
        this.f['placaVehiculo'].setValue(vehiculo.placa);
      }
      else {
        this.openModalVehiculo();
      }
    });
  }

  openModalVehiculo() {
    this.modalService.open(VehiculoListModalComponent, { size: 'lg' }).result.then((vehiculo) => this.actualizar(vehiculo));
  }

  actualizar(vehiculo: Vehiculo) {
    this.registerForm.controls['placaVehiculo'].setValue(vehiculo.placa);
  }


  buscarServicio() {
    this.servicioService.get(this.registerForm.value.codigoServicio).subscribe(servicio => {
      if (servicio != null) {
        this.f['codigoServicio'].setValue(servicio.tipoServicio);
        this.f['valorServicio'].setValue(servicio.valor);
      }
      else {
        this.openModalServicio();
      }
    });
  }

  openModalServicio() {
    this.modalService.open(ServiciosListModalComponent, { size: 'lg' }).result.then((servicio) => this.actualizarServicio(servicio));
  }

  actualizarServicio(servicio: Servicio) {
    this.registerForm.controls['codigoServicio'].setValue(servicio.tipoServicio);
    this.registerForm.controls['valorServicio'].setValue(servicio.valor);
  }

  create() {
    this.cotizacion = this.registerForm.value;
    this.cotizacion.codigoCotizacion = this.codigoNuevo;
    this.cotizacion.valorAproximado = this.totalPago;
    this.cotizacionService.post(this.cotizacion).subscribe(c => {
        if (c != null) {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "Solicitud aceptada";
            messageBox.componentInstance.message = 'Una solictud de cotizacion fue ingresada al sistema!';
            this.onReset();
        }
    });
  }

  createDetalle() {
    this.detalleCotizacion = this.registerForm.value;
    this.detalleCotizacion.codigoCotizacion = this.codigoNuevo;
    this.detalleCotizacionService.post(this.detalleCotizacion).subscribe(c => {
        if (c != null) {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "Solicitud aceptada";
            messageBox.componentInstance.message = 'Se ingreso un servicio a su cotizacion!';
            this.traerDetalles();
        }
    });
    
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.create();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  getAll() {
    this.cotizacionService.getAll().subscribe(cotizacions => this.cotizacions = cotizacions);
  }

  traerDetalles(){
    this.detalleCotizacionService.getAll().subscribe(detalles => this.detalleCotizaciones = detalles);   
  }
  recorrer(){
    this.getAll();
    this.contador = this.cotizacions.length+1;
    this.codigoNuevo = "COTIZACION-" + this.contador;
    this.traerDetalles();
    this.searchText = this.codigoNuevo;
  }

  CalcularTotal(): void {
    this.traerDetalles();
    this.totalPago=0;
    this.detalleCotizaciones.forEach(element => {
      if(element.codigoCotizacion == this.codigoNuevo){
        this.totalPago = this.totalPago + element.valorServicio;
      }
    });
  }
}
