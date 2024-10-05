import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faCheckCircle, faPlus, faTimes, faEnvelope, faCheckDouble, faBolt, faMicrochip, faFileAlt, faCode, faBell, faTag, faTrash, faCog, faSignOutAlt, faSearch, faClock } from '@fortawesome/free-solid-svg-icons';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatesCanvasComponent } from './plantillas/templates-canvas/templates-canvas.component';
import { PlantillaNovaComponent } from './plantillas/plantilla-nova/plantilla-nova.component';
import { PlantillaEspacioComponent } from './plantillas/plantilla-espacio/plantilla-espacio.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TemplatesCanvasComponent,
    PlantillaNovaComponent,
    PlantillaEspacioComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      maxOpened: 3,
      autoDismiss: true,
      enableHtml: true,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUser, faLock, faEye, faEyeSlash, faCheckCircle, faPlus, faTimes, faEnvelope, faCheckDouble, faBolt, faMicrochip, faFileAlt, faCode, faBell, faTag, faTrash, faCog, faSignOutAlt, faSearch, faClock);
  }
}
