import { Component, OnInit } from '@angular/core';

import { Categoria } from '../ICategoria';

import { CategoriaService } from '../categoria.service';

import { MensajeService } from '../mensaje.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];

  dtOptions: any = {};
  tabla: boolean = false;

  categoriaSeleccionada?: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  onSelect(categoria: Categoria): void {
    this.categoriaSeleccionada = categoria;
    this.mensajeService.add(
      `Componente de Categorias: Categoria seleccionada con ID=${categoria.id}`
    );
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((categoria) => {
      this.categorias = categoria;

      this.dtOptions = categoria;
      this.tabla = true;
    }); // Esperamos que el server nos mande los datos - Metodo asincrono
    console.log('mostrar data');
  }

  agregar(nombreCategoria: string): void {
    if (!nombreCategoria) {
      return;
    }

    this.categoriaService
      .agregarCategoria({ nombreCategoria } as Categoria)
      .subscribe((categoria) => {
        this.categorias.push(categoria);
      });
  }

  eliminar(categoria: Categoria): void {
    this.categorias = this.categorias.filter((s) => s !== categoria);
    this.categoriaService.eliminarCategoria(categoria.id).subscribe();
  }

  title = 'angular-datatables-example';
}
