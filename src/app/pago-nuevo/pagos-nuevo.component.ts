import {
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { Pago } from '../IPago';
import { PagoService } from '../pago.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Socio } from '../ISocio';
import { SociosService } from '../socios.service';

import { Categoria } from '../ICategoria';
import { CategoriaService } from '../categoria.service';

import { add } from 'date-fns';
import getTime from 'date-fns/getTime';
import format from 'date-fns/format';
import { isAfter, isBefore, isSameDay } from 'date-fns';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-pagos-nuevo',
  templateUrl: './pagos-nuevo.component.html',
  styleUrls: ['./pagos-nuevo.component.css'],
})
export class PagosNuevoComponent implements OnInit {
  datos = this.pagoService.obtenerPagos();

  socios: Socio[] = [];
  pagos: Pago[] = [];
  categoria: Categoria[] = [];

  socioNombre: any = 'N/A';
  socioCategoriaPago: any;
  socioFrecuenciaPago: any;
  socioPagoSiguiente: any;
  costoCategoriaPago: any;
  totalCategoriaPago: any;

  montoPagado: any;

  fechaActual: any;

  isEnabled: boolean = true;
  puedePagar: boolean = true;

  obtenerSocios(): void {
    this.socioService.obtenerSocios().subscribe((socios) => {
      this.socios = socios;

      console.log(socios);
    });
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((categoria) => {
      this.categoria = categoria;

      //console.log(categoria);
    });
  }

  // Validacion de campos
  formulario = new FormGroup({
    nombreSocio: new FormControl(''),
    monto: new FormControl(''),
    fechaPago: new FormControl(''),
    fechaPagoSiguiente: new FormControl(''),
    frecuenciaPago: new FormControl(''),
    categoriaPago: new FormControl(''),
    categoriaCosto: new FormControl(''),
    totalAPagar: new FormControl(''),
    comentario: new FormControl(''),
  });

  constructor(
    private pagoService: PagoService,
    private socioService: SociosService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Establecemos los valores de las entadas del formulario
    this.formulario.patchValue({
      nombreSocio: this.socioNombre,
      frecuenciaPago: this.socioFrecuenciaPago,
      categoriaPago: this.socioCategoriaPago,

      // NEW
      categoriaCosto: this.costoCategoriaPago,
      totalAPagar: this.totalCategoriaPago,
    });

    var pago = this.formulario.value;


    if (pago.monto < pago.totalAPagar) {
      alert('El monto es menor al total a pagar');
    } else if (pago.monto == pago.totalAPagar) {
      this.pagoService
        .agregarPago(pago)
        .subscribe((pago) => this.pagos.push(pago));

        console.warn('Agregaste un pago a la base de datos', this.formulario.value);

        alert('wait');

      this.formulario.reset();
      this.router.navigate(['/pagos']);
    } else if (pago.monto > pago.totalAPagar) {
      alert('El monto no puede ser mayor al total a pagar');
    }
  }

  select2Selected() {
    $('.select2').on('select2:select', (e: any) => {
      var item = e.params.data;
      var socioID = item.element.dataset.idsocio;

      this.socioNombre = item.text;
      this.socioCategoriaPago = item.element.dataset.pagocategoria;
      this.socioFrecuenciaPago = item.element.dataset.pagofrecuencia;

      for (let x in this.categoria) {
        // console.log(this.categoria[i].nombreCategoria)
        if (this.socioCategoriaPago == this.categoria[x].nombreCategoria) {
          this.costoCategoriaPago = this.categoria[x].precioCategoria;
        }
      }

      if (this.socioFrecuenciaPago == 'Mensual') {
        this.totalCategoriaPago = this.costoCategoriaPago;
      } else if (this.socioFrecuenciaPago == 'Bimensual') {
        var num = this.costoCategoriaPago.replace(/\$/g, '') * 2;
        // this.totalCategoriaPago = num.toPrecision(4)
        this.totalCategoriaPago = num;
      } else if (this.socioFrecuenciaPago == 'Trimestral') {
        var num = this.costoCategoriaPago.replace(/\$/g, '') * 3;
        this.totalCategoriaPago = num;
      } else if (this.socioFrecuenciaPago == 'Anual') {
        var num = this.costoCategoriaPago.replace(/\$/g, '') * 12;
        this.totalCategoriaPago = num;
      } else {
        this.totalCategoriaPago = '';
      }

      // Fecha Actual
      var preFechaActual = getTime(new Date());
      this.fechaActual = format(preFechaActual, 'yyyy-MM-dd');
      //console.log(this.fechaActual);

      this.obtenerPago(socioID);

      this.addDate(this.fechaActual);

      // CHECKBOX
      $('#pagoInput').prop('checked', false);
      $('#adelantoInput').prop('checked', false);
    });
  }

  addDate(eventDate: string) {
    //console.log(`Agregaremos a la fecha ${this.socioFrecuenciaPago}`)

    if (this.socioFrecuenciaPago == 'Mensual') {
      console.log('Agregamos 1 mes a ' + eventDate);

      // Agarramos la fecha actual y le agregamos 1 mes
      const result = add(new Date(eventDate), {
        months: 1,
      });

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    } else if (this.socioFrecuenciaPago == 'Bimensual') {
      console.log('Agregamos 2 meses a ' + eventDate);

      const result = add(new Date(eventDate), {
        months: 2,
      });

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    } else if (this.socioFrecuenciaPago == 'Trimestral') {
      console.log('Agregamos 3 meses a ' + eventDate);

      const result = add(new Date(eventDate), {
        months: 3,
      });

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    } else if (this.socioFrecuenciaPago == 'Anual') {
      console.log('Agregamos 12 meses a ' + eventDate);

      const result = add(new Date(eventDate), {
        months: 12,
      });

      this.socioPagoSiguiente = result.toISOString().slice(0, 10);
    }
  }

  obtenerPago(socioID: number): void {
    const IdSocio = socioID;

    this.pagoService
      .obtenerPagoSocio(IdSocio)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('ups something happened'));
        })
      )
      // .subscribe((pago) => console.log(pago));
      .subscribe({
        next: (Pagos) => {
          if (!Pagos || !Pagos.length) {
            console.warn('No hay pagos');
            this.isEnabled = false;
          } else {
            var fechaPagoReciente = new Date(Pagos[0].fechaPago);

            var puedePagar, preFechaPago;

            for (let x in Pagos) {
              preFechaPago = getTime(new Date());
              puedePagar = isBefore(
                preFechaPago,
                new Date(Pagos[x].fechaPagoSiguiente)
              );

              if (isBefore(fechaPagoReciente, new Date(Pagos[x].fechaPago))) {
                fechaPagoReciente = new Date(Pagos[x].fechaPago);
                //console.log(fechaPagoReciente)
              }
            }

            // DONE
            if (puedePagar == false) {
              alert('El usuario puede pagar');
              this.isEnabled = false;
            } else {
              alert('El usuario ya pago');
              this.isEnabled = true;
            }
          }
        },
        error: (err: any) => {
          console.error('Error');
        },
        complete: () => {},
      });
  }

  // CHECKBOX
  checkbox(checkBoxPago: any,checkBoxAdelanto: any): void{

    if (checkBoxPago.is(':checked')){
      console.log(this.puedePagar)

      if (this.puedePagar == false) {
        //alert('El usuario puede pagar');
        this.isEnabled = false;
      } else {
        //alert('El usuario ya pago');
        this.isEnabled = true;
      }
    }
    else {
      console.log('adelanto')
      this.isEnabled = false;
    }
  }

  ngOnInit(): void {
    this.obtenerSocios();
    this.obtenerCategorias();

    $('.select2').select2();

    this.select2Selected();

    // CHECKBOX
    $('.form-check').on('click', () => {
      var checkBoxPago = $('#pagoInput');
      var checkBoxAdelanto = ('#adelantoInput');

      this.checkbox(checkBoxPago,checkBoxAdelanto);
    });

  }
}
