import { Pipe, PipeTransform } from '@angular/core';
import { Mecanico } from 'src/app/models/mecanico';
@Pipe({
  name: 'filtroMecanicos'
})
export class FiltroMecanicosPipe implements PipeTransform {

  transform(mecanicos: Mecanico[], searchText: string) {
    if (searchText == null) return mecanicos;
    return mecanicos.filter(mecanico =>
        mecanico.identificacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
        mecanico.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
        mecanico.apellido.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
  }

}
