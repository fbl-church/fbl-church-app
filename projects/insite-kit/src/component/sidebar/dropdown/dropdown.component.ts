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

  readonly MAX_DROPDOWN_HEIGHT = '1000px';
  dropdownCloseIcon = 'caret-left';
  dropdownOpenIcon = 'caret-down';

  constructor(private readonly router: Router) {}

  close() {
    this.closeSidebar.emit();
  }

  toggleDropdown(id: string) {
    if (
      document.getElementById(id).style.maxHeight === this.MAX_DROPDOWN_HEIGHT
    ) {
      this.closeDropDown(id);
    } else {
      this.openDropdown(id);
    }
  }

  openDropdown(id: string) {
    document.getElementById(id).style.maxHeight = this.MAX_DROPDOWN_HEIGHT;
  }

  closeDropDown(id: string) {
    document.getElementById(id).style.maxHeight = '0';
  }

  getDropdownIcon(id: string) {
    const element = document.getElementById(id);
    if (element) {
      return element.style.maxHeight === this.MAX_DROPDOWN_HEIGHT
        ? this.dropdownOpenIcon
        : this.dropdownCloseIcon;
    } else {
      return null;
    }
  }

  isRouteActive(route: any) {
    return this.router.url.includes(route);
  }
}
