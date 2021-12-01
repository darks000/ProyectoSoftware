import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service'
import { Servicio } from 'src/app/models/servicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';

@Component({
  selector: 'app-registrar-servicio',
  templateUrl: './registrar-servicio.component.html',
  styleUrls: ['./registrar-servicio.component.css']
})
export class RegistrarServicioComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(private servicioService: ServicioService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  servicio:Servicio;
  ngOnInit() {
    this.servicio = new Servicio();
    this.registerForm = this.formBuilder.group({
      tipoServicio: [this.servicio.tipoServicio, Validators.required],
      imagenServicio: [this.servicio.imagenServicio, Validators.required],
      categoria: [this.servicio.categoria, Validators.required],
      valor: [this.servicio.valor, Validators.required],
    });
  }

  get f() { return this.registerForm.controls; }


  create() {
    this.servicio = this.registerForm.value;
    this.servicioService.post(this.servicio).subscribe(c => {
        if (c != null) {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "Solicitud aceptada";
            messageBox.componentInstance.message = 'Un servicio fue ingresado al sistema!';
            this.onReset();
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


}
