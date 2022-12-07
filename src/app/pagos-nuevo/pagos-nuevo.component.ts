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
import { TestBed } from '@angular/core/testing';

import {add } from 'date-fns';
import getTime from "date-fns/getTime"
import format from "date-fns/format"

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

  socioNombre: any = 'N/A ';
  socioCategoriaPago: any;
  socioFrecuenciaPago: any;
  socioPagoSiguiente: any;

  fechaActual: any;

  obtenerSocios(): void {
    this.socioService.obtenerSocios().subscribe((socios) => {
      this.socios = socios;

      console.log(socios);
    });
  }

  // Validacion de campos
  formulario = new FormGroup({
    nombreSocio: new FormControl,
    monto: new FormControl(''),
    fechaPago: new FormControl(''),
    fechaPagoSiguiente: new FormControl(''),
    frecuenciaPago: new FormControl(''),
    categoriaPago: new FormControl(''),
    comentario: new FormControl(''),
  });

  constructor(
    private pagoService: PagoService,
    private socioService: SociosService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.warn(
      'Agregaste un pago a la base de datos',
      this.formulario.value
    );

    // Establecemos los valores de las entadas del formulario
      this.formulario.patchValue({
        nombreSocio: this.socioNombre,
        frecuenciaPago: this.socioFrecuenciaPago,
        categoriaPago: this.socioCategoriaPago,
      })

      console.log(this.formulario)
      //alert('wait')


    var pago = this.formulario.value;

    this.pagoService
      .agregarPago(pago)
      .subscribe((pago) => this.pagos.push(pago));

    this.formulario.reset();

    this.router.navigate(['/pagos']);
  }


  select2Selected() {
    $('.select2').on('select2:select', (e: any) => {
      var item = e.params.data;

      //console.log(item);

      this.socioNombre = item.text;
      this.socioCategoriaPago = item.element.dataset.pagocategoria;
      this.socioFrecuenciaPago = item.element.dataset.pagofrecuencia;

      // Fecha Actual
      var preFechaActual = getTime(new Date);
      this.fechaActual = format(preFechaActual, 'yyyy-MM-dd')
      console.log(this.fechaActual);

    });
  }

  addDate(eventDate: string) {
    //console.log(`Agregaremos a la fecha ${this.socioFrecuenciaPago}`)

    if (this.socioFrecuenciaPago == "Mensual") {
      console.log('Agregamos 1 mes a ' + eventDate)

      // Agarramos la fecha actual y le agregamos 1 mes
      const result = add(new Date(eventDate), {
        months: 1,
      })

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    }

    if (this.socioFrecuenciaPago == 'Bimensual' || this.socioFrecuenciaPago == "BI-Mensual"){
      console.log('Agregamos 2 meses a ' + eventDate)

      const result = add(new Date(eventDate), {
        months: 2,
      })

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    } 

    if (this.socioFrecuenciaPago == 'Trimestral'){
      console.log('Agregamos 3 meses a ' + eventDate)

      const result = add(new Date(eventDate), {
        months: 3,
      })

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    } 

    if (this.socioFrecuenciaPago == 'Anual'){
      console.log('Agregamos 12 meses a ' + eventDate)

      const result = add(new Date(eventDate), {
        months: 12,
      })

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    } 

  }

  ngOnInit(): void {
    this.obtenerSocios();
    $('.select2').select2();

    this.select2Selected();

  }
}
