import { ActivatedRoute } from '@angular/router';
import { MecanicoService } from 'src/app/services/mecanico.service'
import { Mecanico } from 'src/app/models/mecanico';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-editar-mecanico',
  templateUrl: './editar-mecanico.component.html',
  styleUrls: ['./editar-mecanico.component.css']
})
export class EditarMecanicoComponent implements OnInit {
  mecanico: Mecanico;
  stask: string;
  constructor(
    private route: ActivatedRoute,
    private mecanicoService: MecanicoService,
    private location: Location
  ) { }
  ngOnInit() {
    this.get();
  }
  get(): void {
    const id =
      this.route.snapshot.paramMap.get('id');
    this.mecanicoService.get(id)
      .subscribe(hero => this.mecanico = hero);
  }
  update(): void {
    this.mecanicoService.update(this.mecanico)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.mecanicoService.delete(this.mecanico)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back;
  }
}
