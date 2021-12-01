import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service'
import { Vehiculo } from 'src/app/models/vehiculo';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {

  vehiculo: Vehiculo;
  stask: string;
  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private location: Location
  ) { }
  ngOnInit() {
    this.get();
  }
  get(): void {
    const id =
      this.route.snapshot.paramMap.get('id');
    this.vehiculoService.get(id)
      .subscribe(hero => this.vehiculo = hero);
  }
  update(): void {
    this.vehiculoService.update(this.vehiculo)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.vehiculoService.delete(this.vehiculo)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back;
  }

}
