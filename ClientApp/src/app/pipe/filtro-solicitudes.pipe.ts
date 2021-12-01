import { Pipe, PipeTransform } from '@angular/core';
import { Cotizacion } from 'src/app/models/cotizacion';

@Pipe({
  name: 'filtroSolicitudes'
})
export class FiltroSolicitudesPipe implements PipeTransform {
  transform(cotizaciones: Cotizacion[], searchText: string) {
    if (searchText == null) return cotizaciones;
    return cotizaciones.filter(cotizacion =>
      cotizacion.codigoPropietario.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      cotizacion.codigoCotizacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      cotizacion.placaVehiculo.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      cotizacion.idMecanico.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      cotizacion.estado.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
  }
}
