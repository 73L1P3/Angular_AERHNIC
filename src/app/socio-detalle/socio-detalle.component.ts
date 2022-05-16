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

  enviado = false;

  onSubmit() {
    this.enviado = true;
  }

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
    this.socioServicio.obtenerSocio(id).subscribe(socio => console.log(socio));
  }

  guardar(): void{
    if(this.socio){
      this.socioServicio.actualizarSocio(this.socio)
      .subscribe(() => this.location.back());
      //.subscribe(() => this.goBack());
    }
  }

}
