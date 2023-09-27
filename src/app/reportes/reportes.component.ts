import { Component, OnInit } from '@angular/core';
import * as Flexmonster from 'flexmonster';
import { data } from 'jquery';
import { catchError, delay } from 'rxjs/operators';
import { Socio } from '../ISocio';
import { MensajeService } from '../mensaje.service';
import { SociosService } from '../socios.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  socios: Socio[] = [];
  sociosInactivo: Socio[] = [];
  Inactivos: Socio[] = [];

  test: any;
  dtOptions: any = {};
  tabla: boolean = false;
  
  constructor(
    private sociosService: SociosService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerSocios();

    this.sociosInactivos();

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
    this.sociosService.obtenerSocios().subscribe((socios) => {
      this.socios = socios;

      //this.sociosInactivo = socios;
    });
  }

  sociosInactivos():void {
    this.sociosService
      .obtenerSocios()
      .pipe(
        catchError(() => {
          return throwError(() => new Error('ups something happened'));
        })
      )
      .subscribe({
        next: (Socios) => {
          if (!Socios || !Socios.length) {
            console.warn('No hay Socios Inactivos');
          } else {
              
            var Inactivos;

            var socioInac = this.socios.filter(a => a.estado == "Inactivo");
            

            this.sociosInactivo = this.socios.filter((property) => {
              const index = this.socios.findIndex((otherProperty) => otherProperty.id === property.id);
              
              return index === this.socios.indexOf(property);
              });


            for (let x in socioInac){

              //console.log(socioInac[x])

              if (typeof this.sociosInactivo !== "undefined") {
              
                this.sociosService.obtenerSocio(socioInac[x].id).subscribe((Inactivos) => {


                  this.socios[x] = Inactivos;

                  //console.log(this.socios[x])
                  console.log(Inactivos)

                  this.dtOptions = this.socios[x];

                  this.dtOptions = {
                    // Declare the use of the extension in the dom parameter
                    //dom: 'Bfrtip',
                    // Configure the buttons
                    //order: [[4, 'desc']],
                  };
                  this.tabla = true;
                });
              } else {
                console.log('error');
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

}