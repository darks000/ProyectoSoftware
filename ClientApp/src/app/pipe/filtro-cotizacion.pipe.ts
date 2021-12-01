import { Pipe, PipeTransform } from '@angular/core';
import { Cotizacion } from 'src/app/models/cotizacion';
@Pipe({
  name: 'filtroCotizacion'
})
export class FiltroCotizacionPipe implements PipeTransform {

  transform(cotizaciones: Cotizacion[], searchText: string) {
    if (searchText == null) return cotizaciones;
    return cotizaciones.filter(cotizacion =>
      cotizacion.codigoPropietario.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
    );
  }

}
