import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Empresa } from './IEmpresa';

import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private empresasUrl = 'api/empresas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private mensajeService: MensajeService
  ) {}

  private log(mensaje: string) {
    this.mensajeService.add(`Servicio de Empresas: ${mensaje}`);
  }

  // GET
  obtenerEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.empresasUrl).pipe(
      tap((_) => this.log('Empresas Obtenidas')),
      catchError(this.handleError<Empresa[]>('obtenerEmpresas', []))
    );
  }

  // GET/?_ID
  obtenerEmpresa(id: number): Observable<Empresa> {
    const url = `${this.empresasUrl}/${id}`;

    console.log(url);

    return this.http
      .get<Empresa>(url)
      .pipe(
        tap(
          (_) => this.log(`Empresa obtenida con ID=${id}`),
          catchError(this.handleError<Empresa>(`obtenerEmpresa ID=${id}`))
        )
      );
  }

  // Buscar Empresas por nombre
  buscarEmpresas(termino: string): Observable<Empresa[]> {
    if (!termino.trim()) {
      return of([]);
    }

    return this.http
      .get<Empresa[]>(`${this.empresasUrl}/?nombre=${termino}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`Encontramos Empresas con estos terminos "${termino}"`)
            : this.log(
                `No encontrramos ningun socio con ese termino "${termino}"`
              )
        ),
        catchError(this.handleError<Empresa[]>('buscarEmpresas', []))
      );
  }

  // PUT
  actualizarEmpresa(empresa: Empresa): Observable<any> {
    return this.http.put(this.empresasUrl, empresa, this.httpOptions).pipe(
      tap((_) => this.log(`Empresa Actualizada ID=${empresa.id}`)),
      catchError(this.handleError<any>('actualizarEmpresa'))
    );
  }

  // POST
  agregarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http
      .post<Empresa>(this.empresasUrl, empresa, this.httpOptions)
      .pipe(
        tap((nuevoEmpresa: Empresa) =>
          this.log(`Empresa agregada con ID=${nuevoEmpresa.id}`)
        ),
        catchError(this.handleError<Empresa>('agregarEmpresa'))
      );
  }

  // DELETE
  eliminarEmpresa(id: number): Observable<Empresa> {
    const url = `${this.empresasUrl}/${id}`;

    return this.http.delete<Empresa>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Empresa Eliminada con ID: ${id}`)),
      catchError(this.handleError<Empresa>('eliminarEmpresa'))
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
