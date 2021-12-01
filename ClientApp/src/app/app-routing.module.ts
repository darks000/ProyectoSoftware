import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
/**COMPONENTES**/
import { LoginComponent } from './componentes/autenticaciones/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ConsultarMecanicoComponent } from './componentes/adminzone/mecanicos/consultar-mecanico/consultar-mecanico.component';
import { EditarMecanicoComponent } from './componentes/adminzone/mecanicos/editar-mecanico/editar-mecanico.component';
import { ConsultarVehiculoComponent } from './componentes/clientzone/vehiculos/consultar-vehiculo/consultar-vehiculo.component';
import { EditarVehiculoComponent } from './componentes/clientzone/vehiculos/editar-vehiculo/editar-vehiculo.component';
import { ConsultarServicioComponent } from './componentes/adminzone/servicios/consultar-servicio/consultar-servicio.component';
import { EditarServicioComponent } from './componentes/adminzone/servicios/editar-servicio/editar-servicio.component';
import { ConsultarCotizacionComponent } from './componentes/clientzone/cotizaciones/consultar-cotizacion/consultar-cotizacion.component';
import { ConsultarRepuestoComponent } from './componentes/adminzone/respuestos/consultar-repuesto/consultar-repuesto.component';
import { EditarRepuestoComponent } from './componentes/adminzone/respuestos/editar-repuesto/editar-repuesto.component';
import { RegistroComponent } from './componentes/autenticaciones/registro/registro.component';
import { MiCuentaComponent } from './componentes/autenticaciones/mi-cuenta/mi-cuenta.component';
import { ConsultarUsuarioComponent } from './componentes/adminzone/usuarios/consultar-usuario/consultar-usuario.component';
import { EditarUsuarioComponent } from './componentes/adminzone/usuarios/editar-usuario/editar-usuario.component';
import { ConsultarSolicitudesComponent } from './componentes/adminzone/solicitudes/consultar-solicitudes/consultar-solicitudes.component';
import { ResponderSolicitudesComponent } from './componentes/adminzone/solicitudes/responder-solicitudes/responder-solicitudes.component';
import { DetallesSolicitudesComponent } from './componentes/adminzone/solicitudes/detalles-solicitudes/detalles-solicitudes.component';
import { RegistrarServicioComponent } from './componentes/adminzone/servicios/registrar-servicio/registrar-servicio.component';

const routes: Routes = [
  {path:'',redirectTo:'/logear',pathMatch:'full'},
  {
    path:'logear',
    component:LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,canActivate:[AuthGuard]
  },
  {
    path: 'mecanicos',
    component: ConsultarMecanicoComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'gestionMecanicos/:id',
    component: EditarMecanicoComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'misvehiculos',
    component: ConsultarVehiculoComponent,canActivate:[AuthGuard]
  },
  {
    path: 'gestionVehiculos/:id',
    component: EditarVehiculoComponent,canActivate:[AuthGuard]
  },
  {
    path: 'misservicios',
    component: ConsultarServicioComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'gestionServicios/:id',
    component: EditarServicioComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'miscotizaciones',
    component: ConsultarCotizacionComponent,canActivate:[AuthGuard]
  },
  {
    path: 'misrepuestos',
    component: ConsultarRepuestoComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'gestionRepuestos/:id',
    component: EditarRepuestoComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'registrarse',
    component: RegistroComponent
  },
  {
    path: 'miCuenta',
    component: MiCuentaComponent,canActivate:[AuthGuard]
  },
  {
    path: 'misusuarios',
    component: ConsultarUsuarioComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'gestionUsuario/:id',
    component: EditarUsuarioComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'missolicitudes',
    component: ConsultarSolicitudesComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'gestionSolicitud/:id',
    component: ResponderSolicitudesComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'detallesSolicitud/:id',
    component: DetallesSolicitudesComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
  {
    path: 'listServicios',
    component: RegistrarServicioComponent,canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' }
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
