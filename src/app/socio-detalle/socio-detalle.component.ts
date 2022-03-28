import { Component, Input, OnInit } from '@angular/core';
import { Socio } from '../ISocio';

@Component({
  selector: 'app-socio-detalle',
  templateUrl: './socio-detalle.component.html',
  styleUrls: ['./socio-detalle.component.css']
})
export class SocioDetalleComponent implements OnInit {

  @Input() socio?: Socio;

  constructor() { }

  ngOnInit(): void {
  }

}
