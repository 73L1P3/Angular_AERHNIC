import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Pago } from '../IPago';
import { PagoService } from '../pago.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Socio } from '../ISocio';
import { SociosService } from '../socios.service';

// JQuery Usage
declare var $: any;

@Component({
  selector: 'app-pagos-nuevo',
  templateUrl: './pagos-nuevo.component.html',
  styleUrls: ['./pagos-nuevo.component.css'],
})
export class PagosNuevoComponent implements OnInit {
  datos = this.pagoService.obtenerPagos();
  //nombreSocios = SociosService.obtenerSocios();

  socios: Socio[] = [];
  pagos: Pago[] = [];

  obtenerSocios(): void {
    this.socioService.obtenerSocios().subscribe((socios) => {
      this.socios = socios;

      console.log(socios);
    });
  }

  // Validacion de campos
  formulario = new FormGroup({
    nombreSocio: new FormControl('', [Validators.required]),
    monto: new FormControl(''),
    fecha: new FormControl(''),
    comentario: new FormControl(''),
  });

  constructor(
    private pagoService: PagoService,
    private socioService: SociosService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.warn(
      'Agregaste una empresa a la base de datos',
      this.formulario.value
    );

    var pago = this.formulario.value;

    this.pagoService
      .agregarPago(pago)
      .subscribe((pago) => this.pagos.push(pago));

    this.formulario.reset();

    this.router.navigate(['/pagos']);
  }

  socioSelect(socio: any) {
    console.log(socio.nombre);
  }

  ngOnInit(): void {
    this.obtenerSocios();
    $('.select2').select2(); //Select2
  }
}
