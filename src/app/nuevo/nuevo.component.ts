import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SociosService } from '../socios.service';

import { Socio } from '../ISocio';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  
  datos = this.sociosService.obtenerSocios();

  socios: Socio[] = [];

  // formulario = this.formBuilder.group({
  //   nombre: '',
  //   apellido: '',
  //   correo: '',
  //   empresa: '',
  //   cargo: '',
  //   telefonoCel: '',
  //   telefonoEmp: '',
  //   cedula: '',
  //   comentario: ''
  // });

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido:new FormControl(''),
    correo: new FormControl(''),
    empresa: new FormControl(''),
    cargo: new FormControl(''),
    telefonoCel: new FormControl(''),
    telefonoEmp: new FormControl(''),
    cedula: new FormControl(''),
    comentario: new FormControl(''),
  })

  constructor(
    //private formBuilder: FormBuilder,
    //private validator: Validator,
    private sociosService: SociosService
  ) { }

  onSubmit(): void {
   // TODO: 
    //this.datos = this.sociosService.limpiarForm();
    console.warn('Agregaste un socio a la base de datos', this.formulario.value);

    var socio = this.formulario.value;

    this.sociosService.agregarSocio(socio).subscribe(socio => this.socios.push(socio));

    this.formulario.reset();
  }

  ngOnInit(): void {
    
  }

}