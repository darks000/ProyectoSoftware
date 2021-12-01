import { Pipe, PipeTransform } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';

@Pipe({
  name: 'filtroServicios'
})
export class FiltroServiciosPipe implements PipeTransform {

  transform(servicios: Servicio[], searchText: string) {
    if (searchText == null) return servicios;
    return servicios.filter(servicio =>
      servicio.categoria.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
    );
  }

}
