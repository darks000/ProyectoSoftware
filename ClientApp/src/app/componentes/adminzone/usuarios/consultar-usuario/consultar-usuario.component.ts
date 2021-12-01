import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consultar-usuario',
  templateUrl: './consultar-usuario.component.html',
  styleUrls: ['./consultar-usuario.component.css']
})
export class ConsultarUsuarioComponent implements OnInit {
  searchText: string;
  usuarios: Usuario[];
  constructor(private usuarioService: UsuarioService,private authorizeService: AuthService,  private modalService: NgbModal) { }


  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.usuarioService.getAll().subscribe(usuarios => this.usuarios = usuarios);
    console.log(JSON.stringify(this.usuarios))
  }


}
