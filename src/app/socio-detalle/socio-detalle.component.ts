import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Socio } from '../ISocio';
import { SociosService } from '../socios.service';

@Component({
  selector: 'app-socio-detalle',
  templateUrl: './socio-detalle.component.html',
  styleUrls: ['./socio-detalle.component.css']
})
export class SocioDetalleComponent implements OnInit {

  // @Input() socio?: Socio;

  socio: Socio | undefined;

  constructor(
    private route: ActivatedRoute,
    private socioServicio: SociosService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.obtenerSocio();
  }

  obtenerSocio(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.socioServicio.obtenerSocio(id).subscribe(socio => this.socio = socio);
  }

  regresar(): void{
    this.location.back();
  }

}
