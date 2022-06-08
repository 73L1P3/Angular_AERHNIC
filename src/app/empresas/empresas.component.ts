import { Component, OnInit } from '@angular/core';

import { Empresa } from '../IEmpresa';
import { EMPRESAS } from '../mock-empresas'; // BD

import { EmpresaService } from '../empresa.service'; //Servicio

import { MensajeService } from '../mensaje.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[] = [];

  dtOptions: any = {};
  tabla: boolean = false;

  empresaSeleccionada?: Empresa;

  constructor(
    private empresaService: EmpresaService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  onSelect(empresa: Empresa): void {
    this.empresaSeleccionada = empresa;
    this.mensajeService.add(
      `Componente de Empresas: Empresa seleccionado con ID=${empresa.id}`
    );
  }

  obtenerEmpresas(): void {
    // this.socios = this.sociosService.obtenerSocios(); // Metodo sincrono
    this.empresaService.obtenerEmpresas().subscribe((empresas) => {
      this.empresas = empresas;

      this.dtOptions = empresas;

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

  agregar(nombreEmpresa: string): void {
    if (!nombreEmpresa) {
      return;
    }

    this.empresaService
      .agregarEmpresa({ nombreEmpresa } as Empresa)
      .subscribe((empresa) => {
        this.empresas.push(empresa);
      });
  }

  eliminar(empresa: Empresa): void {
    this.empresas = this.empresas.filter((s) => s !== empresa);
    this.empresaService.eliminarEmpresa(empresa.id).subscribe();
  }

  title = 'angular-datatables-example';
}
