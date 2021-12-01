import { Component, OnInit } from '@angular/core';
import { RepuestoService } from 'src/app/services/repuesto.service'
import { Repuesto } from 'src/app/models/repuesto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';

@Component({
  selector: 'app-registrar-repuesto',
  templateUrl: './registrar-repuesto.component.html',
  styleUrls: ['./registrar-repuesto.component.css']
})
export class RegistrarRepuestoComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(private repuestoService: RepuestoService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  repuesto:Repuesto;
  ngOnInit() {
    this.repuesto = new Repuesto();
    this.registerForm = this.formBuilder.group({
      codigoRepuesto: [this.repuesto.codigoRepuesto, Validators.required],
      nombrRepuesto: [this.repuesto.nombrRepuesto, Validators.required],
      descripcionRepuesto: [this.repuesto.descripcionRepuesto, Validators.required],
      valorRepuesto: [this.repuesto.valorRepuesto, Validators.required],
    });
  }

  get f() { return this.registerForm.controls; }


  create() {
    this.repuesto = this.registerForm.value;
    this.repuestoService.post(this.repuesto).subscribe(c => {
        if (c != null) {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "Solicitud aceptada";
            messageBox.componentInstance.message = 'Un repuesto fue ingresado al sistema!';
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
