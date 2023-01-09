import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pago } from '../IPago';
import { PagoService } from '../pago.service';

@Component({
  selector: 'app-pago-detalle',
  templateUrl: './pago-detalle.component.html',
  styleUrls: ['./pago-detalle.component.css'],
})
export class PagoDetalleComponent implements OnInit {
  pago: Pago | undefined;

  enviado = false;

  onSubmit() {
    this.enviado = true;
  }

  constructor(
    private route: ActivatedRoute,
    private pagoService: PagoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerPago();
  }

  obtenerPago(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.pagoService.obtenerPago(id).subscribe((pago) => (this.pago = pago));

    //this.pagoService.obtenerPago(id).subscribe((pago) => console.log(pago));
  }

  guardar(): void {
    if (this.pago) {
      this.pagoService
        .actualizarPago(this.pago)
        .subscribe(() => this.location.back());
      //.subscribe(() => this.goBack());
    }
  }
}
