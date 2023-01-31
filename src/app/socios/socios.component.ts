import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Socio } from '../ISocio'; // Interfaz
import { Pago } from '../IPago';

import { SociosService } from '../socios.service'; //Servicio
import { MensajeService } from '../mensaje.service';
import { PagoService } from '../pago.service';
import { getTime, isBefore } from 'date-fns';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css'],
})
export class SociosComponent implements OnInit {
  socios: Socio[] = [];

  dtOptions: any = {};
  tabla: boolean = false;

  socioSeleccionado?: Socio;
  
  constructor(
    private sociosService: SociosService,
    private pagoService: PagoService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerSocios();
    this.moroso();
  }

  onSelect(socio: Socio): void {
    this.socioSeleccionado = socio;
    this.mensajeService.add(
      `Componente de Socios: Socio seleccionado con ID=${socio.id}`
    );
  }

  obtenerSocios(): void {
    // this.socios = this.sociosService.obtenerSocios(); // Metodo sincrono
    this.sociosService.obtenerSocios().subscribe((socios) => {
      this.socios = socios;

      this.dtOptions = socios;
      this.dtOptions = {
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: ['columnsToggle','copy', 'print', 'excel'],
      };
      this.tabla = true;
    }); // Esperamos que el server nos mande los datos - Metodo asincrono
    console.log('mostrar data');
  }

  moroso(): void {
    this.pagoService
      .obtenerPagos()
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
          } else {

            console.log(Pagos)
            
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
                console.log(fechaPagoReciente)
              }
            }



          }
        },
        error: (err: any) => {
          console.error('Error');
        },
        complete: () => {},
      });

  }








  agregar(nombre: string): void {
    if (!nombre) {
      return;
    }

    this.sociosService.agregarSocio({ nombre } as Socio).subscribe((socio) => {
      this.socios.push(socio);
    });
  }

  eliminar(socio: Socio): void {
    this.socios = this.socios.filter((s) => s !== socio);
    this.sociosService.eliminarSocio(socio.id).subscribe();
  }

  pagos(socio: Socio): void {
    this.socioSeleccionado = socio;
    this.mensajeService.add(
      `Componente de Socios: Socio seleccionado con ID=${socio.id}`
    );
  }

  title = 'angular-datatables-example';

}