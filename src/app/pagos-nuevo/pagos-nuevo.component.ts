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

import {add } from 'date-fns'
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

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

  socioSelect(socio: any) {
    console.log(socio.nombre);

    var today = new Date();

    $('#fechaPago').value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }

  select2Selected() {
    $('.select2').on('select2:select', (e: any) => {
      var item = e.params.data;

      //console.log(item);

      this.socioNombre = item.text;
      this.socioCategoriaPago = item.element.dataset.pagocategoria;
      this.socioFrecuenciaPago = item.element.dataset.pagofrecuencia;

    });
  }

  addDate(eventDate: string) {
    //console.log(`Agregaremos a la fecha ${this.socioFrecuenciaPago}`)

    if (this.socioFrecuenciaPago == "Mensual") {
      console.log('Agregamos 1 mes a ' + eventDate)

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
