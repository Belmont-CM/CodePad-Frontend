import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}