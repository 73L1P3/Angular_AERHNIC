import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SociosComponent } from './socios/socios.component';
import { AppComponent } from './app.component';
import { NuevoComponent  } from './nuevo/nuevo.component';
import { CumpleComponent } from './cumple/cumple.component';
import { InicioComponent  } from './inicio/inicio.component';
import { LoginComponent  } from './login/login.component';
import { SocioDetalleComponent } from './socio-detalle/socio-detalle.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'detalle/:id', component: SocioDetalleComponent },
  { path: 'socios', component: SociosComponent },
  { path: 'home', component: AppComponent },
  {path: 'nuevo', component: NuevoComponent},
  {path: 'cumple', component: CumpleComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
