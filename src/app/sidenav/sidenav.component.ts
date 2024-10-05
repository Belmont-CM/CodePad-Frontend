import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; 
import {
  faBolt, faFileAlt, faCode, faBell, faTag, faTrash,
  faCog, faUser, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() isOpen: boolean = true;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  faBolt = faBolt;
  faFileAlt = faFileAlt;
  faCode = faCode;
  faBell = faBell;
  faTag = faTag;
  faTrash = faTrash;
  faCog = faCog;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  constructor(private router: Router) {} 
  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.logout.emit();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}