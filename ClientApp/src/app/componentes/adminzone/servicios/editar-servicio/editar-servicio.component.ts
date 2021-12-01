import { ActivatedRoute } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service'
import { Servicio } from 'src/app/models/servicio';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  servicio: Servicio;
  stask: string;
  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private location: Location
  ) { }
  ngOnInit() {
    this.get();
  }
  get(): void {
    const id =
      this.route.snapshot.paramMap.get('id');
    this.servicioService.get(id)
      .subscribe(hero => this.servicio = hero);
  }
  update(): void {
    this.servicioService.update(this.servicio)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.servicioService.delete(this.servicio)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back;
  }

}
