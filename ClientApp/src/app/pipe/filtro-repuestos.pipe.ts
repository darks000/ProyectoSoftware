import { Pipe, PipeTransform } from '@angular/core';
import { Repuesto } from 'src/app/models/repuesto';
@Pipe({
  name: 'filtroRepuestos'
})
export class FiltroRepuestosPipe implements PipeTransform {

  transform(repuestos: Repuesto[], searchText: string) {
    if (searchText == null) return repuestos;
    return repuestos.filter(repuesto =>
      repuesto.codigoRepuesto.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      repuesto.nombrRepuesto.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
  }

}
