import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/models/usuario';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { AlertModalComponent } from 'src/app/componentes/flotantes/alertas/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  prueba : Usuario;
  stask: string;
  registerForm: FormGroup;
  logear:Login;
  submitted = false;
  
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
    private _router: Router
  ) { }
  ngOnInit() {
    this.logear = new Login();
    this.registerForm = this.formBuilder.group({
      username: [this.logear.username,Validators.required],
      contra: [this.logear.contra,Validators.required]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.verify();
    this._router.navigate(['/home']);
  }

  
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  get(): void {
    const id =
      this.route.snapshot.paramMap.get('id');
    this.usuarioService.get(this.logear.username)
      .subscribe(hero => this.prueba = hero);
  }

  verify(){
    if (this.prueba.identificacion == this.logear.username && this.prueba.password == this.logear.contra){
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "Login exitoso";
      messageBox.componentInstance.message = ('Bienvenida: '+this.prueba.nombre);
      this.login()
    }else{
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "Login Fallido";
      messageBox.componentInstance.message = 'Datos incorrectos';
    }
  }


  login()
  {
      this.authService.login(this.prueba.identificacion,this.prueba.nombre,this.prueba.apellido, this.prueba.password, this.prueba.rol);
  }

}
