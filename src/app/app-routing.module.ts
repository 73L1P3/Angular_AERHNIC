import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SociosComponent } from './socios/socios.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'socios', component: SociosComponent },
  { path: 'home', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
