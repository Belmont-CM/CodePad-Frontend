import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Asegúrate de que esta importación sea correcta
import { DashboardComponent } from './dashboard/dashboard.component'; // Importa el DashboardComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }, // Ruta para el dashboard
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirección a login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
