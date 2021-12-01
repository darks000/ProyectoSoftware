import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Pipe({
  name: 'filtroUsuarios'
})
export class FiltroUsuariosPipe implements PipeTransform {

  transform(usuarios: Usuario[], searchText: string) {
    if (searchText == null) return usuarios;
    return usuarios.filter(usuario =>
      usuario.identificacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      usuario.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      usuario.apellido.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
  }

}
