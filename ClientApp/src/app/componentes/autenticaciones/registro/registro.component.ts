import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  registerForm: FormGroup;
  submitted = false;

  constructor(private clienteService: UsuarioService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  cliente: Usuario;

  ngOnInit() {
    this.cliente = new Usuario();  
    this.registerForm = this.formBuilder.group({
      Identificacion: [this.cliente.identificacion, [Validators.required, Validators.minLength(4), Validators.maxLength(11)]],
      Email: [this.cliente.email ,Validators.required],
      Sexo:[this.cliente.sexo, Validators.required],
      Nombre: [this.cliente.nombre, Validators.required],
      Apellido: [this.cliente.apellido, Validators.required],
      Direccion: [this.cliente.direccion ,Validators.required],
      Telefono: [this.cliente.telefono, Validators.required],
      Rol:[this.cliente.rol = "CLIENTE"],
      Password: [this.cliente.password, Validators.required]
    });
  }
  get f() { return this.registerForm.controls; }

  
  create() {
    this.cliente = this.registerForm.value;

    this.clienteService.post(this.cliente).subscribe(c => {
        if (c != null) {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "Proceso Aceptado";
            messageBox.componentInstance.message = 'Su cuenta fue registrada en el sistema';
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
