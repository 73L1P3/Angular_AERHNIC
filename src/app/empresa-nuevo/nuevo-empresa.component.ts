import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Empresa } from '../IEmpresa';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-nuevo-empresa',
  templateUrl: './nuevo-empresa.component.html',
  styleUrls: ['./nuevo-empresa.component.css'],
})
export class NuevoEmpresaComponent implements OnInit {
  datos = this.empresaService.obtenerEmpresas();

  empresas: Empresa[] = [];

  // Validacion de campos
  formulario = new FormGroup({
    nombreEmpresa: new FormControl('', [Validators.required]),
    empresaDireccion: new FormControl(''),
    telefonoEmpresa: new FormControl(''),
    empresaComentario: new FormControl(''),
  });

  constructor(private empresaService: EmpresaService, private router: Router) {}

  onSubmit(): void {
    console.warn(
      'Agregaste una empresa a la base de datos',
      this.formulario.value
    );

    var empresa = this.formulario.value;

    this.empresaService
      .agregarEmpresa(empresa)
      .subscribe((empresa) => this.empresas.push(empresa));

    this.formulario.reset();

    this.router.navigate(['/empresas']);
  }

  ngOnInit(): void {}
}
