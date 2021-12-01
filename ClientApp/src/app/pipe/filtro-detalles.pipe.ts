import { Pipe, PipeTransform } from '@angular/core';
import { DetalleCotizacion } from 'src/app/models/detalle-cotizacion';
@Pipe({
  name: 'filtroDetalles'
})
export class FiltroDetallesPipe implements PipeTransform {

  transform(detalles: DetalleCotizacion[], searchText: string) {
    if (searchText == null) return detalles;
    return detalles.filter(detalleCotizacion =>
      detalleCotizacion.codigoCotizacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
    );
  }

}
