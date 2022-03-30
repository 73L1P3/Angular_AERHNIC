import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Socio } from './ISocio';
import { SOCIOS } from './mock-socios';

import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  constructor(private mensajeService: MensajeService) { }

  obtenerSocios(): Observable<Socio[]> {
    const socios = of(SOCIOS);
    this.mensajeService.add('Servicio de Socios: Socios obtenidos')
    return socios;
  }
}

