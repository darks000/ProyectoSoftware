import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/models/usuario';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuario: Usuario;
  stask: string;
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private location: Location
  ) { }
  ngOnInit() {
    this.get();
  }
  get(): void {
    const id =
      this.route.snapshot.paramMap.get('id');
    this.usuarioService.get(id)
      .subscribe(hero => this.usuario = hero);
  }
  update(): void {
    this.usuarioService.update(this.usuario)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back;
  }
}
