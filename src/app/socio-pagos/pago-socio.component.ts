import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pago } from '../IPago';
import { MensajeService } from '../mensaje.service';
import { PagoService } from '../pago.service';

@Component({
  selector: 'app-pago-socio',
  templateUrl: './pago-socio.component.html',
  styleUrls: ['./pago-socio.component.css']
})

export class PagoSocioComponent implements OnInit {
  pagos: Pago[] = [];

  dtOptions: any = {};
  tabla: boolean = false;

  pagoSeleccionado?: Pago;

  constructor(
    private route: ActivatedRoute,
    private pagoService: PagoService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    const socioID = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerPagos(socioID);
  }

  onSelect(pago: Pago): void {
    this.pagoSeleccionado = pago;
    this.mensajeService.add(
      `Componente de Pagos: Pago seleccionado con ID=${pago.id}`
    );
  }

  obtenerPagos(socioID: number): void {
    const IdSocio = socioID;

    this.pagoService
      .obtenerPagoSocio(IdSocio)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('ups something happened'));
        })
      )
      // .subscribe((pago) => console.log(pago))
      .subscribe((pago) =>{
        this.pagos = pago;

        this.dtOptions = pago;
  
        this.dtOptions = {
          // Declare the use of the extension in the dom parameter
          dom: 'Bfrtip',
          // Configure the buttons
          buttons: ['copy', 'print', 'excel'],
        };
  
        this.tabla = true;
      });     
  }

  eliminar(pago: Pago): void {
    this.pagos = this.pagos.filter((s) => s !== pago);
    this.pagoService.eliminarPago(pago.id).subscribe();
  }

  title = 'angular-datatables-example';
}
