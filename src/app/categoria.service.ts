import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Categoria } from './ICategoria';

import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private categoriaUrl = 'api/categorias';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private mensajeService: MensajeService
  ) {}

  private log(mensaje: string) {
    this.mensajeService.add(`Servicio de Categoria: ${mensaje}`);
  }

  // GET
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriaUrl).pipe(
      tap((_) => this.log('Categorias Obtenidas')),
      catchError(this.handleError<Categoria[]>('obtenerCategorias', []))
    );
  }

  // GET/?_ID
  obtenerCategoria(id: number): Observable<Categoria> {
    const url = `${this.categoriaUrl}/${id}`;
    return this.http
      .get<Categoria>(url)
      .pipe(
        tap(
          (_) => this.log(`Categoria obtenida con ID=${id}`),
          catchError(this.handleError<Categoria>(`obtenerCategoria ID=${id}`))
        )
      );
  }

  // PUT
  actualizarCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(this.categoriaUrl, categoria, this.httpOptions).pipe(
      tap((_) => this.log(`Categoria Actualizada ID=${categoria.id}`)),
      catchError(this.handleError<any>('actualizarCategoria'))
    );
  }

  // POST
  agregarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post<Categoria>(this.categoriaUrl, categoria, this.httpOptions)
      .pipe(
        tap((nuevaCategoria: Categoria) =>
          this.log(`Categoria agregada con ID=${nuevaCategoria.id}`)
        ),
        catchError(this.handleError<Categoria>('agregarCategoria'))
      );
  }

  // DELETE
  eliminarCategoria(id: number): Observable<Categoria> {
    const url = `${this.categoriaUrl}/${id}`;

    return this.http.delete<Categoria>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Categoria Eliminada con ID: ${id}`)),
      catchError(this.handleError<Categoria>('eliminarCategoria'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operacion - name of the operation that failed
   * @param resultado - optional value to return as the observable result
   */
  private handleError<T>(operacion = 'operation', resultado?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operacion} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(resultado as T);
    };
  }
}
