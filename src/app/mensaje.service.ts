import { Injectable } from '@angular/core';


import {timer} from 'rxjs';
import {takeWhile, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  mensajes: string[] = [];

  add(mensaje: string){
    this.mensajes.push(mensaje);

    let counter = 8;
    timer(3000) //Initial delay 1 seconds and interval countdown also 1 second
      .pipe(
        takeWhile( () => counter > 0 ),
        tap(() => counter--)
      )
      .subscribe( () => {
        this.clear();
      } );
  }

  clear(){
    this.mensajes =[];
  }

  // readonly source = timer(3000);

  // readonly subscribe = this.source.subscribe(val => this.clear());

  constructor() {
    // const source = timer(3000);

    // const subscribe = source.subscribe(val => this.clear());

    // let counter = 4;
    // timer(1000) //Initial delay 1 seconds and interval countdown also 1 second
    //   .pipe(
    //     takeWhile( () => counter > 0 ),
    //     tap(() => counter--)
    //   )
    //   .subscribe( () => {
    //     this.clear();
    //   } );
  }
}
