import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {
  // Iconos
  faPlus = faPlus;

  isSidenavOpen: boolean = true;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  handleLogout() {
    console.log('Cerrando sesión...');
  }

}
