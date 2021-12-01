import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/models/usuario';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {


  usuario: Usuario;
  stask: string;
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private location: Location
  ) { }
  ngOnInit() {
    this.get();
  }
  get(): void {
    this.usuarioService.get(this.userName())
      .subscribe(hero => this.usuario = hero);
  }
  update(): void {
    this.usuarioService.update(this.usuario)
      .subscribe(() => this.goBack());
  }
  

  goBack(): void {
    this.location.back;
  }

  userName(): string {
    return this.authService.getUserName();
  }
}
