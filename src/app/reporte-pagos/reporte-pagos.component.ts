import { Component, OnInit } from '@angular/core';
import * as Flexmonster from 'flexmonster';
import { data } from 'jquery';
import { delay } from 'rxjs/operators';

import { Pago } from '../IPago';

import { MensajeService } from '../mensaje.service';
import { PagoService } from '../pago.service';

@Component({
  selector: 'app-reporte-pagos',
  templateUrl: './reporte-pagos.component.html',
  styleUrls: ['./reporte-pagos.component.css']
})
export class ReportePagosComponent implements OnInit {

  pagos: Pago[] = [];

  test: any;

  
  constructor(
    private pagoService: PagoService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerPagos();

    setTimeout(() => {

      var x = this.pagos;
  
      x.forEach(pago => {

        if ( typeof(pago.montoPagado) === 'string'){
          var newAmount = pago.montoPagado.replace(/[$,]/g, '');
          pago.montoPagado = newAmount;
          //console.log(pago.montoPagado);
        }
        else {
          console.log('Number')
        }

      });

      
      var pivot = new Flexmonster({
        container: "pivot-container",
        componentFolder: "node_modules/flexmonster/",
        toolbar: true,
        report: {
          dataSource: {
            // data: jsonData
            data: x
          },
          slice: {
            reportFilters: [{
              "uniqueName": "fechaPago.Year",
              "filter": {
                 "query": {
                    "after": "2020-03-27"
                 }
              }
           },
           {
            "uniqueName": "fechaPago.Month",
            "filter": {
               "query": {
                  "after": "2020-03-27"
               }
            }
         }
          ],
            rows: [
              { uniqueName: "categoriaTipo" },

            ],
            columns: [
              { uniqueName: "fechaPago.Year" },

            ],
            measures: [
              {
                uniqueName: "montoPagado",
                formula: "sum(montoPagado)",
                aggregation: "sum",
              },
            ],

          },
          options: {
            grid: {
              type: 'classic',
              showHeaders: false,
            }
          }
        }
      });
    }, 1000); 
  }

  obtenerPagos(): void {
    this.pagoService.obtenerPagos().subscribe((pago) => {
      this.pagos = pago;

      console.log(this.pagos)
    }); // Esperamos que el server nos mande los datos - Metodo asincrono
    console.log('mostrar data');
  }

}