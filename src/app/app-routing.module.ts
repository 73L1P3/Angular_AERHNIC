import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SociosComponent } from './socios/socios.component';
import { AppComponent } from './app.component';
import { NuevoComponent } from './socio-nuevo/nuevo.component';
import { CumpleComponent } from './cumple/cumple.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { SocioDetalleComponent } from './socio-detalle/socio-detalle.component';

import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaDetalleComponent } from './empresa-detalle/empresa-detalle.component';
import { NuevoEmpresaComponent } from './empresa-nuevo/nuevo-empresa.component';

import { CategoriaComponent } from './categorias/categoria.component';
import { CategoriaDetalleComponent } from './categoria-detalle/categoria-detalle.component';
import { NuevaCategoriaComponent } from './categoria-nuevo/nueva-categoria.component';

import { PagosComponent } from './pagos/pagos.component';
import { PagosNuevoComponent } from './pago-nuevo/pagos-nuevo.component';
import { PagoDetalleComponent } from './pago-detalle/pago-detalle.component';
import { PagoSocioComponent } from './socio-pagos/pago-socio.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'detalle/:id', component: SocioDetalleComponent },
  { path: 'socios', component: SociosComponent },
  { path: 'home', component: AppComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'cumple', component: CumpleComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'empresa-detalle/:id', component: EmpresaDetalleComponent },
  { path: 'empresa-nuevo', component: NuevoEmpresaComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'categoria-detalle/:id', component: CategoriaDetalleComponent },
  { path: 'categoria-nuevo', component: NuevaCategoriaComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'pagos-nuevo', component: PagosNuevoComponent },
  { path: 'pago-detalle/:id', component: PagoDetalleComponent },
  { path: 'pago-socio/:id', component: PagoSocioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
