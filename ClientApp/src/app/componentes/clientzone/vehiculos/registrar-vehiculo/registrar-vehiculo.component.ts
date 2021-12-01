import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service'
import { Vehiculo } from 'src/app/models/vehiculo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css']
})
export class RegistrarVehiculoComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(private vehiculoService: VehiculoService,private authService: AuthService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  vehiculo:Vehiculo;

  ngOnInit() {
    this.vehiculo = new Vehiculo();
    this.registerForm = this.formBuilder.group({
      placa: [this.vehiculo.placa, Validators.required],
      modelo: [this.vehiculo.modelo, Validators.required],
      year: [this.vehiculo.year, Validators.required],
      color: [this.vehiculo.color, Validators.required],
      cilindraje: [this.vehiculo.cilindraje, Validators.required],
      propietario: [this.vehiculo.propietario = this.userName()]
    });
  }

  userName(): string {
    return this.authService.getUserName();
  }

  get f() { return this.registerForm.controls; }


  create() {
    this.vehiculo = this.registerForm.value;
    this.vehiculoService.post(this.vehiculo).subscribe(c => {
        if (c != null) {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "Solicitud aceptada";
            messageBox.componentInstance.message = 'Un vehiculo fue ingresado al sistema!';
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
