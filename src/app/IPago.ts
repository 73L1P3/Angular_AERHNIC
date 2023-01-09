export interface Pago {
  id: number;
  idSocio: number;
  nombreSocio: string;
  montoPagado: string;
  montoFaltante: string;
  fechaPago: string;
  fechaPagoSiguiente: string;
  categoriaCosto: string;
  categoriaTipo: string;
  frecuenciaPago: string;
  comentario: string;
}
