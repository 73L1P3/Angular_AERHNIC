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

import { Categoria } from '../ICategoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit {
  datos = this.categoriaService.obtenerCategorias();

  categorias: Categoria[] = [];

  // Validacion de campos
  formulario = new FormGroup({
    nombreCategoria: new FormControl('', [Validators.required]),
    precioCategoria: new FormControl(''),
    comentarioCategoria: new FormControl(''),
  });

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.warn(
      'Agregaste una categoria a la base de datos',
      this.formulario.value
    );

    var categoria = this.formulario.value;

    this.categoriaService
      .agregarCategoria(categoria)
      .subscribe((categoria) => this.categorias.push(categoria));

    this.formulario.reset();

    this.router.navigate(['/categoria']);
  }

  ngOnInit(): void {}
}
