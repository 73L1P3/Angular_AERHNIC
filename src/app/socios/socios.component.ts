import { Component, OnInit } from '@angular/core';

import { Socio } from '../ISocio'; // Interfaz

import { SociosService } from '../socios.service'; //Servicio
import { MensajeService } from '../mensaje.service';

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
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerSocios();
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
        buttons: ['copy', 'print', 'excel'],
      };
      this.tabla = true;
    }); // Esperamos que el server nos mande los datos - Metodo asincrono
    console.log('mostrar data');
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