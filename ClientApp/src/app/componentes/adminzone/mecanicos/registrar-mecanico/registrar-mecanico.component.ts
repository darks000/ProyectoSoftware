import { Component, OnInit } from '@angular/core';
import { MecanicoService } from 'src/app/services/mecanico.service'
import { Mecanico } from 'src/app/models/mecanico';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';

@Component({
  selector: 'app-registrar-mecanico',
  templateUrl: './registrar-mecanico.component.html',
  styleUrls: ['./registrar-mecanico.component.css']
})
export class RegistrarMecanicoComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(private mecanicoService: MecanicoService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  mecanico:Mecanico;
  ngOnInit() {
    this.mecanico = new Mecanico();
    this.registerForm = this.formBuilder.group({
      identificacion: [this.mecanico.identificacion, Validators.required],
      nombre: [this.mecanico.nombre, Validators.required],
      apellido: [this.mecanico.apellido, Validators.required],
      experienciaLaboral: [this.mecanico.experienciaLaboral, Validators.required],
      especialidad: [this.mecanico.especialidad, Validators.required],
    });
  }

  get f() { return this.registerForm.controls; }


  create() {
    this.mecanico = this.registerForm.value;
    this.mecanicoService.post(this.mecanico).subscribe(c => {
        if (c != null) {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "Solicitud aceptada";
            messageBox.componentInstance.message = 'Un mecanico fue ingresado al sistema!';
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
