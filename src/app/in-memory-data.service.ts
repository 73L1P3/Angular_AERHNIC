import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Socio } from './ISocio';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const socios = [
      {
        id: 1,
        nombre: 'Jorge',
        apellido: 'Sequiera',
        correo: 'jse@mail.com',
        empresa: 'Waishar',
        cargo: 'SEO',
        telefonoCelular: '8811223344',
        telefonoEmpresa: '77992244',
        cedula: '001-123456-1234A',
        contactoPago: 'Correo Personal',
        comentario: 'SEO'
    },
    {
        id: 2,
        nombre: 'Maria',
        apellido: 'Alvarez',
        correo: 'maz@mail.com',
        empresa: 'Petronic',
        cargo: 'Manager',
        telefonoCelular: '8811223344',
        telefonoEmpresa: '77992244',
        cedula: '001-123456-1234A',
        contactoPago: 'Correo Personal',
        comentario: 'Gerente DMS'
    },
    {
        id: 3,
        nombre: 'Clemente',
        apellido: 'Guido',
        correo: 'cgd@mail.com',
        empresa: 'Raspados Loli',
        cargo: 'DMS',
        telefonoCelular: '8811223344',
        telefonoEmpresa: '77992244',
        cedula: '001-123456-1234A',
        contactoPago: 'Correo Personal',
        comentario: 'Rapado'
    },
    {
        id: 4,
        nombre: 'Erika',
        apellido: 'Singer',
        correo: 'esr@mail.com',
        empresa: 'Canal 4',
        cargo: 'Vice CEO',
        telefonoCelular: '8811223344',
        telefonoEmpresa: '77992244',
        cedula: '001-123456-1234A',
        contactoPago: 'Correo Personal',
        comentario: 'Algun dia'
    },
    {
      id: 5,
      nombre: "Karla", 
      apellido: "Arcia",
      cargo: "Jefa de Area", 
      pagoCategoria: "Tipo B",
      cedula: "karla@mail.com",
      comentario: "Test",
      correo: "karla@mail.com",
      direccion: "Esquina norte del parque",
      empresa: "Teleton",​
      pagoFrecuencia: "Trimestral",
      fechaIngreso: "2022-05-25",​
      sexo: "Mujer",
      telefonoCelular: "77884422",
      telefonoEmpresa: "00998811"
    },
    ];
    return {socios};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(socios: Socio[]): number {
    return socios.length > 0 ? Math.max(...socios.map(socios => socios.id)) + 1 : 5;
  }
}