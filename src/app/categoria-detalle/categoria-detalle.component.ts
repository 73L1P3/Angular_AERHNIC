import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Categoria } from '../ICategoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.component.html',
  styleUrls: ['./categoria-detalle.component.css'],
})
export class CategoriaDetalleComponent implements OnInit {
  categoria: Categoria | undefined;

  formularioEnviado = false;

  onSubmit() {
    this.formularioEnviado = true;
  }

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  obtenerCategoria(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log(id);

    this.categoriaService
      .obtenerCategoria(id)
      .subscribe((categoria) => (this.categoria = categoria));

    this.categoriaService
      .obtenerCategoria(id)
      .subscribe((categoria) => console.log(categoria));
  }

  guardar(): void {
    if (this.categoria) {
      this.categoriaService
        .actualizarCategoria(this.categoria)
        .subscribe(() => this.location.back());
      //.subscribe(() => this.goBack());
    }
  }
}
