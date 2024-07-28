import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../sidebar.config';

@Component({
  selector: 'ik-dropdown',
  templateUrl: 'dropdown.component.html',
})
export class DropdownComponent {
  @HostBinding('class.width--full') hostClass = true;
  @Input() navItem: NavItem;
  @Input() isNested = false;
  @Input() baseRoute = '';

  isOpen = false;
  dropdownCloseIcon = 'caret-left';
  dropdownOpenIcon = 'caret-down';

  constructor(private readonly router: Router) {}

  toggleDropdown() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  isRouteActive(route: any) {
    return this.router.url.includes(route);
  }
}
