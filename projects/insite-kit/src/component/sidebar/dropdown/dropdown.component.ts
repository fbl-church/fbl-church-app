import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../sidebar.config';

@Component({
  selector: 'ik-dropdown',
  templateUrl: 'dropdown.component.html',
})
export class DropdownComponent {
  @Input() navItem: NavItem;
  @Output() closeSidebar = new EventEmitter<void>();

  isOpen = false;
  dropdownCloseIcon = 'caret-left';
  dropdownOpenIcon = 'caret-down';

  constructor(private readonly router: Router) {}

  close() {
    this.closeSidebar.emit();
  }

  toggleDropdown() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  getDropdownIcon(id: string) {
    const element = document.getElementById(id);
    if (element) {
      return this.isOpen ? this.dropdownOpenIcon : this.dropdownCloseIcon;
    } else {
      return null;
    }
  }

  isRouteActive(route: any) {
    return this.router.url.includes(route);
  }
}
