import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Socio } from './ISocio';
import { Empresa } from './IEmpresa';

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
        comentario: 'SEO',
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
        comentario: 'Gerente DMS',
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
        comentario: 'Rapado',
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
        comentario: 'Algun dia',
      },
      {
        id: 5,
        nombre: 'Karla',
        apellido: 'Arcia',
        cargo: 'Jefa de Area',
        pagoCategoria: 'Tipo B',
        cedula: 'karla@mail.com',
        comentario: 'Test',
        correo: 'karla@mail.com',
        direccion: 'Esquina norte del parque',
        empresa: 'Teleton',
        pagoFrecuencia: 'Trimestral',
        fechaIngreso: '2022-05-25',
        sexo: 'Mujer',
        telefonoCelular: '77884422',
        telefonoEmpresa: '00998811',
      },
    ];

    const empresas = [
      {
        id: 1,
        nombreEmpresa: 'Pollos Narcy',
        direccionEmpresa: 'Rotonda Centro America',
        telefonoEmpresa: '484848284',
        comentarioEmpresa: 'Prueba 1',
      },
      {
        id: 2,
        nombreEmpresa: 'Parmalat',
        direccionEmpresa: 'Km 9 carretara sur',
        telefonoEmpresa: '93939393',
        comentarioEmpresa: 'Prueba 2',
      },
      {
        id: 3,
        nombreEmpresa: 'Dos Pinos',
        direccionEmpresa: 'Km 11 carretera norte',
        telefonoEmpresa: '93939393',
        comentarioEmpresa: 'Prueba 3',
      },
      {
        id: 4,
        nombreEmpresa: 'Pollo TipTop',
        direccionEmpresa: 'Km 11 carretera a Masaya',
        telefonoEmpresa: '83839393',
        comentarioEmpresa: 'Prueba 4',
      },
    ];

    const categorias = [
      {
        id: 0,
        nombreCategoria: 'A',
        precioCategoria: '$5',
        comentarioCategoria: 'hola',
      },
      {
        id: 1,
        nombreCategoria: 'D',
        precioCategoria: '$8',
        comentarioCategoria: 'hola',
      },
      {
        id: 2,
        nombreCategoria: 'C',
        precioCategoria: '$9',
        comentarioCategoria: 'hola',
      },
      {
        id: 3,
        nombreCategoria: 'D',
        precioCategoria: '$2',
        comentarioCategoria: 'hola',
      },
    ];

    const pagos = [
      {
        id: 1,
        nombreSocio: 'Jorge',
        monto: '420',
        fecha: '10/09/2022:13:45',
        comentario: 'Pago realizado via ACH',
      },
      {
        id: 2,
        nombreSocio: 'Jose',
        monto: '651',
        fecha: '12/04/2022:07:11',
        comentario: 'Pago en efectivo',
      },
      {
        id: 3,
        nombreSocio: 'Miguel',
        monto: '111',
        fecha: '12/31/2022:08:08',
        comentario: 'Pago test',
      },
      {
        id: 4,
        nombreSocio: 'Maria',
        monto: '1234',
        fecha: '10/09/2022:23:22',
        comentario: 'Pago test',
      },
    ];

    return { socios, empresas, categorias, pagos };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(socios: Socio[]): number {
    return socios.length > 0
      ? Math.max(...socios.map((socios) => socios.id)) + 1
      : 5;
  }
}
