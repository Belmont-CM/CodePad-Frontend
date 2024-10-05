import { Component } from '@angular/core';
import {
  faSearch, faClock, faFileAlt, faCode, faTag, faPlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  faSearch = faSearch;
  faClock = faClock;
  faFileAlt = faFileAlt;
  faCode = faCode;
  faTag = faTag;
  faPlus = faPlus;

  isSidenavOpen: boolean = true;
  searchQuery: string = '';
  recentNotes: string[] = ['Idea para nuevo proyecto', 'Notas de la reunión', 'Lista de tareas', 'Recordatorios'];
  recentCode: string[] = ['React Component', 'Python Script', 'SQL Query', 'CSS Animation'];
  popularTags: string[] = ['JavaScript', 'Angular', 'Python', 'CSS', 'HTML', 'SQL', 'Git'];
  recentActivity: { action: string, time: string }[] = [
    { action: 'Creaste una nueva nota', time: 'Hace 2 horas' },
    { action: 'Actualizaste el código "Angular Component"', time: 'Ayer' },
    { action: 'Añadiste una nueva etiqueta "TypeScript"', time: 'Hace 2 días' },
    { action: 'Compartiste una nota con un colaborador', time: 'Hace 3 días' },
  ];

  handleLogout() {
    console.log('Cerrando sesión...');
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}