import { Component, OnInit } from '@angular/core';
import * as Flexmonster from 'flexmonster';
import { data } from 'jquery';
import { delay } from 'rxjs/operators';
import { Socio } from '../ISocio';
import { MensajeService } from '../mensaje.service';
import { SociosService } from '../socios.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  socios: Socio[] = [];

  test: any;

  socioSeleccionado?: Socio;
  
  constructor(
    private sociosService: SociosService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerSocios();


    let jsonData =  [
      {
          "Category": "Accessories",
          "Price": 125,
          "Quantity": 100
      },
      {
          "Category": "Accessories",
          "Price": 74,
          "Quantity": 235
      },
      {
          "Category": "Bikes",
          "Price": 233,
          "Quantity": 184
      }
  ];

    setTimeout(() => {
      var pivot = new Flexmonster({
        container: "flex1",
        licenseKey: "Z75Y-XB4A27-543M18-604K6G",
        componentFolder: "node_modules/flexmonster/",
        width: 650,
        
        report: {
          options: {
            viewType: "charts",
          },
          dataSource: {
            // data: jsonData
            data: this.socios
          },
          slice: {
            rows: [

            ],
            columns: [
              {
                uniqueName: "estado"
            },
            ],
            measures: [
                {
                    uniqueName: "estado",
                    aggregation: "sum",
                    active: true
                }
            ]
          }
        }
      });
    }, 1000); 

  }

  obtenerSocios(): void {
    // this.socios = this.sociosService.obtenerSocios(); // Metodo sincrono
    this.sociosService.obtenerSocios().subscribe((socios) => {
      this.socios = socios;

      //console.log(this.socios)

      //this.test = JSON.stringify(this.socios)

    }); // Esperamos que el server nos mande los datos - Metodo asincrono
    //console.log('mostrar data');
  }
}