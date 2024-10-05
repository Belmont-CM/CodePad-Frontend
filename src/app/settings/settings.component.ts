import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // General settings
  darkMode = true;
  language = 'es';
  notifications = true;

  // Editor settings
  fontSize = 14;
  livePreview = true;

  // Appearance settings
  theme = 'neon';

  // Advanced settings
  autoSave = true;
  cloudSync = true;

  // Sidenav state
  isSidenavOpen = false;

  constructor() { }

  ngOnInit(): void { }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  handleLogout(): void {
    // Implement logout logic here
  }

  // Methods to handle setting changes
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }

  changeLanguage(lang: string): void {
    this.language = lang;
  }

  toggleNotifications(): void {
    this.notifications = !this.notifications;
  }

  changeFontSize(size: number): void {
    this.fontSize = size;
  }

  toggleLivePreview(): void {
    this.livePreview = !this.livePreview;
  }

  changeTheme(newTheme: string): void {
    this.theme = newTheme;
  }

  toggleAutoSave(): void {
    this.autoSave = !this.autoSave;
  }

  toggleCloudSync(): void {
    this.cloudSync = !this.cloudSync;
  }
}