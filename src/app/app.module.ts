import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SociosComponent } from './socios/socios.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { CumpleComponent } from './cumple/cumple.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { SocioDetalleComponent } from './socio-detalle/socio-detalle.component';
import { MensajesComponent } from './mensajes/mensajes.component'

import { DataTablesModule } from 'angular-datatables';
import { CalendarModule, DateAdapter  } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaDetalleComponent } from './empresa-detalle/empresa-detalle.component';
import { NuevoEmpresaComponent } from './nuevo-empresa/nuevo-empresa.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaDetalleComponent } from './categoria-detalle/categoria-detalle.component';
import { NuevaCategoriaComponent } from './nueva-categoria/nueva-categoria.component';
import { PagosComponent } from './pagos/pagos.component';
import { PagosNuevoComponent } from './pagos-nuevo/pagos-nuevo.component';
import { PagoDetalleComponent } from './pago-detalle/pago-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SociosComponent,
    NuevoComponent,
    CumpleComponent,
    InicioComponent,
    LoginComponent,
    SocioDetalleComponent,
    MensajesComponent,
    EmpresasComponent,
    EmpresaDetalleComponent,
    NuevoEmpresaComponent,
    CategoriaComponent,
    CategoriaDetalleComponent,
    NuevaCategoriaComponent,
    PagosComponent,
    PagosNuevoComponent,
    PagoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    DataTablesModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
