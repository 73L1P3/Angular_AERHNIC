import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SociosComponent } from './socios/socios.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { CumpleComponent } from './cumple/cumple.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

import { DataTablesModule } from 'angular-datatables';
import { CalendarModule, DateAdapter  } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SociosComponent,
    NuevoComponent,
    CumpleComponent,
    InicioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
