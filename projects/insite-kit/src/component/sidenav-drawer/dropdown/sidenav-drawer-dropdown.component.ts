import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../sidenav-drawer.config';

@Component({
  selector: 'ik-sidenav-drawer-dropdown',
  templateUrl: 'sidenav-drawer-dropdown.component.html',
})
export class SidenavDrawerDropdownComponent {
  @HostBinding('class.width--full') hostClass = true;
  @Input() navItem: NavItem;
  @Input() isNested = false;
  @Input() baseRoute = '';
  @Output() nestedRouted = new EventEmitter<string>();

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

  onRoute(path: string) {
    this.nestedRouted.emit(path);
  }

  isRouteActive(route: any) {
    return this.router.url.includes(route);
  }
}
