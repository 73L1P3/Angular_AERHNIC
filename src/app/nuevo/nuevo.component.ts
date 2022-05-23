import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

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

  // Validacion de campos
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido:new FormControl(''),
    correo: new FormControl(''),
    fechaIngreso: new FormControl(''),
    empresa: new FormControl(''),
    cargo: new FormControl(''),
    pagoCategoria: new FormControl(''),
    pagoFrecuencia: new FormControl(''),
    telefonoCelular: new FormControl(''),
    telefonoEmpresa: new FormControl(''),
    cedula: new FormControl(''),
    sexo: new FormControl(''),
    direccion: new FormControl(''),
    comentario: new FormControl(''),
  })

  constructor(
    //private formBuilder: FormBuilder,
    //private validator: Validator,
    private sociosService: SociosService,
    private router: Router
  ) { }

  onSubmit(): void {
   // TODO: 
    //this.datos = this.sociosService.limpiarForm();
    console.warn('Agregaste un socio a la base de datos', this.formulario.value);

    var socio = this.formulario.value;

    this.sociosService.agregarSocio(socio).subscribe(socio => this.socios.push(socio));
    
    this.formulario.reset();

    this.router.navigate(['/socios']);
  }

  ngOnInit(): void {
    
  }

}