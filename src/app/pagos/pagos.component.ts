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

  agregar(nombreCategoria: string): void {
    // if (!nombreCategoria) {
    //   return;
    // }
    // this.pagoService
    //   .agregarCategoria({ nombreCategoria } as Pago)
    //   .subscribe((pago) => {
    //     this.categorias.push(pago);
    //   });
  }

  eliminar(pago: Pago): void {
    // this.categorias = this.categorias.filter((s) => s !== pago);
    // this.categoriaService.eliminarCategoria(pago.id).subscribe();
  }

  title = 'angular-datatables-example';
}
