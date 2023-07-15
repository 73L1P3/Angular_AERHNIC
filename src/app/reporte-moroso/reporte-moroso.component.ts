import { Component, OnInit } from '@angular/core';
import { data, uniqueSort } from 'jquery';
import * as Flexmonster from 'flexmonster';
import { format, getTime, isBefore } from 'date-fns';

import { throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

import { Socio } from '../ISocio';
import { Pago } from '../IPago';

import { MensajeService } from '../mensaje.service';
import { SociosService } from '../socios.service';
import { PagoService } from '../pago.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reporte-moroso',
  templateUrl: './reporte-moroso.component.html',
  styleUrls: ['./reporte-moroso.component.css']
})
export class ReporteMorosoComponent implements OnInit {

  socios: Socio[] = [];
  testing: Socio[] = [];
  pagos: Pago[] = [];
  uniquePagos: Pago[] = [];
  dtOptions: any = {};
  tabla: boolean = false;
  socioSeleccionado?: Socio;
  
  constructor(
    private sociosService: SociosService,
    private mensajeService: MensajeService,
    private pagoService: PagoService,
  ) {}

  ngOnInit(): void {
    this.obtenerSocios();
    this.obtenerPagos();
    this.moroso();

    setTimeout(() => {

      var pivot = new Flexmonster({
        container: "flex2",
        componentFolder: "node_modules/flexmonster/",
        licenseKey: "Z75Y-XB4A27-543M18-604K6G",
        width: "100%",
        report: {
          dataSource: {
            data: this.socios
          },
          slice: {
            rows: [
              {
                uniqueName: "moroso"
            },
            ],
            columns: [

            ],
            measures: [
                {
                    uniqueName: "moroso",
                    aggregation: "sum",
                    active: true
                }
            ]
          },
          options: {
            viewType: "charts",
            chart: {
              type: "pie"
            }
          }
        }
      });
    }, 1000);

  }

  obtenerSocios(): void {
    this.sociosService.obtenerSocios().subscribe((socios) => {
      this.socios = socios;
      //this.dtOptions = socios;
      // this.dtOptions = {
      //   // Declare the use of the extension in the dom parameter
      //   dom: 'Bfrtip',
      //   // Configure the buttons
      //   order: [[4, 'asc']],
      // };
      // this.tabla = true;
    });
  }

  obtenerPagos(): void{
    this.pagoService.obtenerPagos().subscribe((pagos) => {
      this.pagos = pagos;
      //console.log(this.pagos);
    })
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

            var puedePagar, today;

            this.uniquePagos = this.pagos.filter((property) => {
              const index = this.pagos.findIndex((otherProperty) => otherProperty.idSocio === property.idSocio);
              
              return index === this.pagos.indexOf(property);
              });

            console.log(this.uniquePagos)

            for (let y in this.uniquePagos){
              today = new Date()

              puedePagar = isBefore(
                new Date(Pagos[y].fechaPagoSiguiente), today
              );                

                if (puedePagar === true){

                    this.sociosService.obtenerSocio(this.uniquePagos[y].idSocio).subscribe((testing) => {

                      //console.log(this.socios[y])



                      this.socios[y] = testing;

                      console.log(testing);

                      this.dtOptions = testing;
  
                      this.dtOptions = {
                        // Declare the use of the extension in the dom parameter
                        //dom: 'Bfrtip',
                        // Configure the buttons
                        //order: [[4, 'desc']],
                      };
                      this.tabla = true;
                    });
                }
            }


            // for (let x in Pagos) {
            //   today = new Date()

            //   puedePagar = isBefore(
            //     new Date(Pagos[x].fechaPagoSiguiente), today
            //   );                

            //     if (puedePagar === true){

            //       if (typeof this.uniquePagos !== "undefined") {
            //         this.sociosService.obtenerSocio(Pagos[x].idSocio).subscribe((socios) => {

            //           this.socios[x] = socios;
            //           this.dtOptions = socios;
  
            //           this.dtOptions = {
            //             // Declare the use of the extension in the dom parameter
            //             //dom: 'Bfrtip',
            //             // Configure the buttons
            //             order: [[4, 'asc']],
            //           };
            //           this.tabla = true;
            //         });

            //       }
                  

            //     } else {
                  
            //     }
            // }

          }
        },
        error: (err: any) => {
          console.error('Error');
        },
        complete: () => {},
      });

  }
}