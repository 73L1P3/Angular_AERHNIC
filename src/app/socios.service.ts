import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Socio } from './ISocio';
import { SOCIOS } from './mock-socios';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  constructor() { }

  obtenerSocios(): Observable<Socio[]> {
    const socios = of(SOCIOS);
    return socios;
  }
}

