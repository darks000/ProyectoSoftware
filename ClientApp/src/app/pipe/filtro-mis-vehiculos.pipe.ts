import { Pipe, PipeTransform } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo';
@Pipe({
  name: 'filtroMisVehiculos'
})
export class FiltroMisVehiculosPipe implements PipeTransform {

  transform(vehiculos: Vehiculo[], searchText: string) {
    if (searchText == null) return vehiculos;
    return vehiculos.filter(vehiculo =>
      vehiculo.propietario.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
    );
  }

}
