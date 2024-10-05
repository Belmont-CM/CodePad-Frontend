import { Component } from '@angular/core';
import {
  faSearch, faCogs, faUser, faSignOutAlt, faBell, faClipboardList,
  faMoon, faSun, faGlobe, faCode, faLaptop, faCloud, faBolt, faSliders, faEye, faPalette, faLock
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  // Iconos
  faSearch = faSearch;
  faCogs = faCogs;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faBell = faBell;
  faClipboardList = faClipboardList;
  faMoon = faMoon;
  faSun = faSun;
  faGlobe = faGlobe;
  faCode = faCode;
  faLaptop = faLaptop;
  faCloud = faCloud;
  faBolt = faBolt;
  faSliders = faSliders;
  faEye = faEye;
  faPalette = faPalette;
  faLock = faLock;

  // Variables para la configuración
  isSidenavOpen: boolean = true;
  darkMode: boolean = true;
  language: string = 'es';
  notifications: boolean = true;
  fontSize: number = 14;
  livePreview: boolean = true;
  theme: string = 'neon';
  autoSave: boolean = true;
  cloudSync: boolean = true;

  // Otras variables existentes
  settingsOptions: string[] = ['Perfil', 'Notificaciones', 'Preferencias', 'Conexiones'];
  recentActions: { action: string, time: string }[] = [
    { action: 'Cambiaste tu foto de perfil', time: 'Hace 1 hora' },
    { action: 'Modificaste tus preferencias de notificaciones', time: 'Ayer' },
    { action: 'Actualizaste tu contraseña', time: 'Hace 2 días' },
    { action: 'Conectaste una nueva cuenta de GitHub', time: 'Hace 3 días' },
  ];

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  setLanguage(lang: string) {
    this.language = lang;
  }

  toggleNotifications() {
    this.notifications = !this.notifications;
  }

  setFontSize(size: number) {
    this.fontSize = size;
  }

  toggleLivePreview() {
    this.livePreview = !this.livePreview;
  }

  setTheme(newTheme: string) {
    this.theme = newTheme;
  }

  toggleAutoSave() {
    this.autoSave = !this.autoSave;
  }

  toggleCloudSync() {
    this.cloudSync = !this.cloudSync;
  }

  handleLogout() {
    console.log('Cerrando sesión...');
  }
}