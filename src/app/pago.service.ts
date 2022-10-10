import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Pago } from './IPago';

import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private pagosUrl = 'api/pagos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private mensajeService: MensajeService
  ) {}

  private log(mensaje: string) {
    this.mensajeService.add(`Servicio de Pagos: ${mensaje}`);
  }

  // GET
  obtenerPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.pagosUrl).pipe(
      tap((_) => this.log('Pagos Obtenidos')),
      catchError(this.handleError<Pago[]>('obtenerPagos', []))
    );
  }

  // GET/?_ID
  obtenerPago(id: number): Observable<Pago> {
    const url = `${this.pagosUrl}/${id}`;
    return this.http
      .get<Pago>(url)
      .pipe(
        tap(
          (_) => this.log(`Socio obtenido con ID=${id}`),
          catchError(this.handleError<Pago>(`obtenerSocio ID=${id}`))
        )
      );
  }

  // Buscar Socios por nombre
  buscarPagos(termino: string): Observable<Pago[]> {
    if (!termino.trim()) {
      return of([]);
    }

    return this.http.get<Pago[]>(`${this.pagosUrl}/?nombre=${termino}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`Encontramos Pagos con estos terminos "${termino}"`)
          : this.log(`No encontrramos ningun pago con ese termino "${termino}"`)
      ),
      catchError(this.handleError<Pago[]>('buscarSocios', []))
    );
  }

  // PUT
  actualizarPago(pago: Pago): Observable<any> {
    return this.http.put(this.pagosUrl, pago, this.httpOptions).pipe(
      tap((_) => this.log(`Socio Actualizado ID=${pago.id}`)),
      catchError(this.handleError<any>('actualizarSocio'))
    );
  }

  // POST
  agregarPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.pagosUrl, pago, this.httpOptions).pipe(
      tap((nuevoSocio: Pago) =>
        this.log(`Pago agregado con ID=${nuevoSocio.id}`)
      ),
      catchError(this.handleError<Pago>('agregarPago'))
    );
  }

  // DELETE
  eliminarPago(id: number): Observable<Pago> {
    const url = `${this.pagosUrl}/${id}`;

    return this.http.delete<Pago>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Pago Eliminado con ID: ${id}`)),
      catchError(this.handleError<Pago>('eliminarPago'))
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
