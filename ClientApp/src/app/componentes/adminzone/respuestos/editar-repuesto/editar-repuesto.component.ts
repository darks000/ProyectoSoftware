import { ActivatedRoute } from '@angular/router';
import { RepuestoService } from 'src/app/services/repuesto.service'
import { Repuesto } from 'src/app/models/repuesto';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-repuesto',
  templateUrl: './editar-repuesto.component.html',
  styleUrls: ['./editar-repuesto.component.css']
})
export class EditarRepuestoComponent implements OnInit {

  repuesto: Repuesto;
  stask: string;
  constructor(
    private route: ActivatedRoute,
    private repuestoService: RepuestoService,
    private location: Location
  ) { }
  ngOnInit() {
    this.get();
  }
  get(): void {
    const id =
      this.route.snapshot.paramMap.get('id');
    this.repuestoService.get(id)
      .subscribe(hero => this.repuesto = hero);
  }
  update(): void {
    this.repuestoService.update(this.repuesto)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.repuestoService.delete(this.repuesto)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back;
  }
}
