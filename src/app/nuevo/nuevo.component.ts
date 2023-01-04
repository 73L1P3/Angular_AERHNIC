import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SociosService } from '../socios.service';

import { Categoria } from '../ICategoria';
import { CategoriaService } from '../categoria.service';

import { Empresa } from '../IEmpresa';
import { EmpresaService } from '../empresa.service';

import { Socio } from '../ISocio';
import { format, getTime } from 'date-fns';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  
  datos = this.sociosService.obtenerSocios();

  socios: Socio[] = [];
  categorias: Categoria[] = [];
  empresas: Empresa[] = [];

  fechaActual: any;


  // Validacion de campos
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido:new FormControl(''),
    correo: new FormControl(''),
    fechaIngreso: new FormControl(''),
    empresa: new FormControl(''),
    cargo: new FormControl(''),
    pagoCategoria: new FormControl(''),
    pagoFrecuencia: new FormControl(''),
    telefonoCelular: new FormControl(''),
    telefonoEmpresa: new FormControl(''),
    cedula: new FormControl(''),
    sexo: new FormControl(''),
    direccion: new FormControl(''),
    comentario: new FormControl(''),
  })

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;

      console.log(categorias);
    });
  }

  obtenerEmpresas(): void {
    this.empresaService.obtenerEmpresas().subscribe((empresas) => {
      this.empresas = empresas;

      console.log(empresas);
    });
  }

  getFecha(): void{
    var preFechaActual = getTime(new Date());
    this.fechaActual = format(preFechaActual, 'yyyy-MM-dd');
  }

  constructor(
    private sociosService: SociosService,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService,
    private router: Router
  ) { }

  onSubmit(): void {
    console.warn('Agregaste un socio a la base de datos', this.formulario.value);

    var socio = this.formulario.value;

    this.sociosService.agregarSocio(socio).subscribe(socio => this.socios.push(socio));
    
    this.formulario.reset();

    this.router.navigate(['/socios']);
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerEmpresas();

    this.getFecha();
  }

}