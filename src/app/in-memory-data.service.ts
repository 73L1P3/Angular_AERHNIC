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
        pagoCategoria: 'Tipo B',
        pagoFrecuencia: 'Trimestral',
        sexo: 'Hombre',
        estado: 'Activo',
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
        pagoCategoria: 'Tipo D',
        pagoFrecuencia: 'Mensual',
        sexo: 'Mujer',
        estado: 'Activo',
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
        pagoCategoria: 'Tipo A',
        pagoFrecuencia: 'Anual',
        sexo: 'Hombre',
        estado: 'Inactivo',
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
        pagoCategoria: 'Tipo C',
        pagoFrecuencia: 'Bimensual',
        sexo: 'Mujer',
        estado: 'Activo',
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
        estado: 'Inactivo',
      },
      {
        id: 6,
        nombre: 'Michelle',
        apellido: 'Narvaez',
        cargo: 'Policia',
        pagoCategoria: 'Tipo C',
        cedula: 'MichelleNa@mail.com',
        comentario: 'Test',
        correo: 'MichelleNa@mail.com',
        direccion: 'Ometepe lounge',
        empresa: 'Alcaldia',
        pagoFrecuencia: 'Mensual',
        fechaIngreso: '2022-05-25',
        sexo: 'Mujer',
        telefonoCelular: '77884422',
        telefonoEmpresa: '00998811',
        estado: 'Inactivo',
      },
      {
        id: 7,
        nombre: 'Jose',
        apellido: 'Perez',
        cargo: 'Gerente',
        pagoCategoria: 'Tipo D',
        cedula: 'joseP@mail.com',
        comentario: 'Test',
        correo: 'joseP@mail.com',
        direccion: 'Cerca del palo de mango',
        empresa: 'Curacao',
        pagoFrecuencia: 'Aual',
        fechaIngreso: '2022-05-25',
        sexo: 'Hombre',
        telefonoCelular: '77112233',
        telefonoEmpresa: '00112233',
        estado: 'Inactivo',
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
        nombreCategoria: 'Tipo A',
        precioCategoria: '$1200',
        comentarioCategoria: 'hola',
      },
      {
        id: 1,
        nombreCategoria: 'Tipo B',
        precioCategoria: '$800',
        comentarioCategoria: 'hola',
      },
      {
        id: 2,
        nombreCategoria: 'Tipo C',
        precioCategoria: '$500',
        comentarioCategoria: 'hola',
      },
      {
        id: 3,
        nombreCategoria: 'Tipo D',
        precioCategoria: '$300',
        comentarioCategoria: 'hola',
      },
    ];

    const pagos = [
      {
        id: 1,
        idSocio: 4,
        nombreSocio: 'Erika Singer',
        montoPagado: '$442',
        montoFaltante: '$58',
        fechaPago: '2023-01-05',
        fechaPagoSiguiente: '2023-03-05',
        categoriaCosto: '$500',
        categoriaTipo: 'Tipo C',
        frecuenciaPago: 'Bimensual',
        comentario: '',
      },
      {
        id: 2,
        idSocio: 2,
        nombreSocio: 'Maria Alvarez',
        montoPagado: '$300',
        montoFaltante: '$0',
        fechaPago: '2023-01-05',
        fechaPagoSiguiente: '2023-02-05',
        categoriaCosto: '$300',
        categoriaTipo: 'Tipo D',
        frecuenciaPago: 'Mensual',
        comentario: '',
      },
      {
        id: 3,
        idSocio: 3,
        nombreSocio: 'Clemente Guido',
        montoPagado: '$14400',
        montoFaltante: '$0',
        fechaPago: '2022-01-04',
        fechaPagoSiguiente: '2023-01-04',
        categoriaCosto: '$1200',
        categoriaTipo: 'Tipo A',
        frecuenciaPago: 'Anual',
        comentario: '',
      },
      {
        id: 4,
        idSocio: 1,
        nombreSocio: 'Jorge Sequiera',
        montoPagado: '$1200',
        montoFaltante: '$1200',
        fechaPago: '2023-01-05',
        fechaPagoSiguiente: '2023-04-05',
        categoriaCosto: '$800',
        categoriaTipo: 'Tipo B',
        frecuenciaPago: 'Trimestral',
        comentario: '',
      },
      {
        id: 5,
        idSocio: 1,
        nombreSocio: 'Jorge Sequiera',
        montoPagado: '$1200',
        montoFaltante: '$0',
        fechaPago: '2023-01-06',
        fechaPagoSiguiente: '2023-04-05',
        categoriaCosto: '$800',
        categoriaTipo: 'Tipo B',
        frecuenciaPago: 'Trimestral',
        comentario: '',
      },
      {
        id: 6,
        idSocio: 3,
        nombreSocio: 'Clemente Guido',
        montoPagado: '$14400',
        montoFaltante: '$0',
        fechaPago: '2019-01-04',
        fechaPagoSiguiente: '2020-01-04',
        categoriaCosto: '$1200',
        categoriaTipo: 'Tipo A',
        frecuenciaPago: 'Anual',
        comentario: '',
      },
      {
        id: 7,
        idSocio: 3,
        nombreSocio: 'Clemente Guido',
        montoPagado: '$14400',
        montoFaltante: '$0',
        fechaPago: '2020-01-04',
        fechaPagoSiguiente: '2021-01-04',
        categoriaCosto: '$1200',
        categoriaTipo: 'Tipo A',
        frecuenciaPago: 'Anual',
        comentario: '',
      },
      {
        id: 8,
        idSocio: 3,
        nombreSocio: 'Clemente Guido',
        montoPagado: '$14400',
        montoFaltante: '$0',
        fechaPago: '2021-01-04',
        fechaPagoSiguiente: '2022-01-04',
        categoriaCosto: '$1200',
        categoriaTipo: 'Tipo A',
        frecuenciaPago: 'Anual',
        comentario: '',
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
