import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Socio } from './ISocio';
import { SOCIOS } from './mock-socios';

import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  private sociosUrl = 'api/socios';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  private log(mensaje: string){
    this.mensajeService.add(`Servicio de Socios: ${mensaje}`);
  }

  // GET
  obtenerSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.sociosUrl).pipe(
      tap(_ => this.log('Socios Obtenidos')),
      catchError(this.handleError<Socio[]>('obtenerSocios', []))
    );
  }

  // GET/?_ID
  obtenerSocio(id: number): Observable<Socio>{
    const url = `${this.sociosUrl}/${id}`;
    return this.http.get<Socio>(url).pipe(
      tap(_ => this.log(`Socio obtenido con ID=${id}`),
      catchError(this.handleError<Socio>(`obtenerSocio ID=${id}`)))
    );
  }

  // PUT
  actualizarSocio(socio: Socio): Observable<any>{
    return this.http.put(this.sociosUrl, socio, this.httpOptions).pipe(
      tap(_ => this.log(`Socio Actualizado ID=${socio.id}`)),
      catchError(this.handleError<any>('actualizarSocio'))
    );
  }

  // POST
  agregarSocio(socio: Socio): Observable<Socio>{
    return this.http.post<Socio>(this.sociosUrl, socio, this.httpOptions).pipe(
      tap((nuevoSocio: Socio) => this.log(`Socio agregado con ID=${nuevoSocio.id}`)),
      catchError(this.handleError<Socio>('agregarSocio'))
    );
  }

  // DELETE
  eliminarSocio(id: number): Observable<Socio> {
    const url = `${this.sociosUrl}/${id}`;

    return this.http.delete<Socio>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Socio Eliminado con ID: ${id}`)),
      catchError(this.handleError<Socio>('eliminarSocio'))
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

