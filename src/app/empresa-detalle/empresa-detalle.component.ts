import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Empresa } from '../IEmpresa';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-empresa-detalle',
  templateUrl: './empresa-detalle.component.html',
  styleUrls: ['./empresa-detalle.component.css'],
})
export class EmpresaDetalleComponent implements OnInit {
  empresa: Empresa | undefined;

  formularioEnviado = false;

  onSubmit() {
    this.formularioEnviado = true;
  }

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerEmpresa();
  }

  obtenerEmpresa(): void {
    const idEmpresa = Number(this.route.snapshot.paramMap.get('id'));

    console.log(idEmpresa);

    this.empresaService
      .obtenerEmpresa(idEmpresa)
      .subscribe((empresa) => (this.empresa = empresa));

    this.empresaService
      .obtenerEmpresa(idEmpresa)
      .subscribe((empresa) => console.log(empresa));
  }

  guardar(): void {
    if (this.empresa) {
      this.empresaService
        .actualizarEmpresa(this.empresa)
        .subscribe(() => this.location.back());
      //.subscribe(() => this.goBack());
    }
  }
}
