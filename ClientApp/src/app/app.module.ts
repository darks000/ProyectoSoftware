import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertModalComponent } from './componentes/flotantes/alertas/alert-modal/alert-modal.component';
import { LoginComponent } from './componentes/autenticaciones/login/login.component';
import { RegistrarMecanicoComponent } from './componentes/adminzone/mecanicos/registrar-mecanico/registrar-mecanico.component';
import { ConsultarMecanicoComponent } from './componentes/adminzone/mecanicos/consultar-mecanico/consultar-mecanico.component';
import { EditarMecanicoComponent } from './componentes/adminzone/mecanicos/editar-mecanico/editar-mecanico.component';
import { MecanicoModalComponent } from './componentes/flotantes/mecanico/mecanico-modal/mecanico-modal.component';
import { FiltroMecanicosPipe } from './pipe/filtro-mecanicos.pipe';
import { RegistrarVehiculoComponent } from './componentes/clientzone/vehiculos/registrar-vehiculo/registrar-vehiculo.component';
import { ConsultarVehiculoComponent } from './componentes/clientzone/vehiculos/consultar-vehiculo/consultar-vehiculo.component';
import { EditarVehiculoComponent } from './componentes/clientzone/vehiculos/editar-vehiculo/editar-vehiculo.component';
import { FiltroMisVehiculosPipe } from './pipe/filtro-mis-vehiculos.pipe';
import { VehiculoModalComponent } from './componentes/flotantes/vehiculo/vehiculo-modal/vehiculo-modal.component';
import { RegistrarServicioComponent } from './componentes/adminzone/servicios/registrar-servicio/registrar-servicio.component';
import { ConsultarServicioComponent } from './componentes/adminzone/servicios/consultar-servicio/consultar-servicio.component';
import { EditarServicioComponent } from './componentes/adminzone/servicios/editar-servicio/editar-servicio.component';
import { FiltroServiciosPipe } from './pipe/filtro-servicios.pipe';
import { ServicioModalComponent } from './componentes/flotantes/servicio/servicio-modal/servicio-modal.component';
import { RegistrarCotizacionComponent } from './componentes/clientzone/cotizaciones/registrar-cotizacion/registrar-cotizacion.component';
import { ConsultarCotizacionComponent } from './componentes/clientzone/cotizaciones/consultar-cotizacion/consultar-cotizacion.component';
import { CotizacionModalComponent } from './componentes/flotantes/cotizacionCliente/cotizacion-modal/cotizacion-modal.component';
import { FiltroCotizacionPipe } from './pipe/filtro-cotizacion.pipe';
import { VehiculoListModalComponent } from './componentes/flotantes/vehiculo/vehiculo-list-modal/vehiculo-list-modal.component';
import { ServiciosListModalComponent } from './componentes/flotantes/servicios/servicios-list-modal/servicios-list-modal.component';
import { FiltroDetallesPipe } from './pipe/filtro-detalles.pipe';
import { RegistrarRepuestoComponent } from './componentes/adminzone/respuestos/registrar-repuesto/registrar-repuesto.component';
import { ConsultarRepuestoComponent } from './componentes/adminzone/respuestos/consultar-repuesto/consultar-repuesto.component';
import { EditarRepuestoComponent } from './componentes/adminzone/respuestos/editar-repuesto/editar-repuesto.component';
import { RepuestosModalComponent } from './componentes/flotantes/repuestos/repuestos-modal/repuestos-modal.component';
import { FiltroRepuestosPipe } from './pipe/filtro-repuestos.pipe';
import { RegistroComponent } from './componentes/autenticaciones/registro/registro.component';
import { MiCuentaComponent } from './componentes/autenticaciones/mi-cuenta/mi-cuenta.component';
import { ConsultarUsuarioComponent } from './componentes/adminzone/usuarios/consultar-usuario/consultar-usuario.component';
import { EditarUsuarioComponent } from './componentes/adminzone/usuarios/editar-usuario/editar-usuario.component';
import { FiltroUsuariosPipe } from './pipe/filtro-usuarios.pipe';
import { ConsultarSolicitudesComponent } from './componentes/adminzone/solicitudes/consultar-solicitudes/consultar-solicitudes.component';
import { ResponderSolicitudesComponent } from './componentes/adminzone/solicitudes/responder-solicitudes/responder-solicitudes.component';
import { FiltroSolicitudesPipe } from './pipe/filtro-solicitudes.pipe';
import { DetallesSolicitudesComponent } from './componentes/adminzone/solicitudes/detalles-solicitudes/detalles-solicitudes.component';
import { MecanicosListModalComponent } from './componentes/flotantes/mecnaico/mecanicos-list-modal/mecanicos-list-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AlertModalComponent,
    LoginComponent,
    RegistrarMecanicoComponent,
    ConsultarMecanicoComponent,
    EditarMecanicoComponent,
    MecanicoModalComponent,
    FiltroMecanicosPipe,
    RegistrarVehiculoComponent,
    ConsultarVehiculoComponent,
    EditarVehiculoComponent,
    FiltroMisVehiculosPipe,
    VehiculoModalComponent,
    RegistrarServicioComponent,
    ConsultarServicioComponent,
    EditarServicioComponent,
    FiltroServiciosPipe,
    ServicioModalComponent,
    RegistrarCotizacionComponent,
    ConsultarCotizacionComponent,
    CotizacionModalComponent,
    FiltroCotizacionPipe,
    VehiculoListModalComponent,
    ServiciosListModalComponent,
    FiltroDetallesPipe,
    RegistrarRepuestoComponent,
    ConsultarRepuestoComponent,
    EditarRepuestoComponent,
    RepuestosModalComponent,
    FiltroRepuestosPipe,
    RegistroComponent,
    MiCuentaComponent,
    ConsultarUsuarioComponent,
    EditarUsuarioComponent,
    FiltroUsuariosPipe,
    ConsultarSolicitudesComponent,
    ResponderSolicitudesComponent,
    FiltroSolicitudesPipe,
    DetallesSolicitudesComponent,
    MecanicosListModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
], { relativeLinkResolution: 'legacy' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
      VehiculoListModalComponent
  ]
})
export class AppModule { }
