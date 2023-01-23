import { Component, OnInit } from '@angular/core';

import { Pago } from '../IPago';

import { MensajeService } from '../mensaje.service';
import { PagoService } from '../pago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
})
export class PagosComponent implements OnInit {
  pagos: Pago[] = [];

  dtOptions: any = {};
  tabla: boolean = false;

  pagoSeleccionado?: Pago;

  constructor(
    private pagoService: PagoService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerPagos();
  }

  onSelect(pago: Pago): void {
    this.pagoSeleccionado = pago;
    this.mensajeService.add(
      `Componente de Pagos: Pago seleccionado con ID=${pago.id}`
    );
  }

  obtenerPagos(): void {
    this.pagoService.obtenerPagos().subscribe((pago) => {
      this.pagos = pago;

      this.dtOptions = pago;

      this.dtOptions = {
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: ['copy', 'print', 'excel'],
      };

      this.tabla = true;
    }); // Esperamos que el server nos mande los datos - Metodo asincrono
    console.log('mostrar data');
  }

  // agregar(pago: string): void {
  //   if (!pago) {
  //     return;
  //   }

  //   this.pagoservice.agregarpago({ pago } as pago).subscribe((pago) => {
  //     this.pagos.push(pago);
  //   });
  // }

  eliminar(pago: Pago): void {
    this.pagos = this.pagos.filter((s) => s !== pago);
    this.pagoService.eliminarPago(pago.id).subscribe();
  }

  title = 'angular-datatables-example';
}
