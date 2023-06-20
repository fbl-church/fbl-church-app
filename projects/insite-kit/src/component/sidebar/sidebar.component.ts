import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faCaretDown,
  faCaretLeft,
  faChartSimple,
  faChildren,
  faCircleInfo,
  faClose,
  faGear,
  faHome,
  faPerson,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { JwtService } from '../../service/auth/jwt.service';

@Component({
  selector: 'ik-sidebar',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  readonly MAX_DROPDOWN_HEIGHT = '1000px';
  isOpen = false;

  closeIcon = faClose;
  homeIcon = faHome;
  aboutIcon = faCircleInfo;
  usersIcon = faUsers;
  childrenIcon = faChildren;
  gurdiansIcon = faPerson;
  gitIcon = faGithub;
  settingsIcon = faGear;
  reportIcon = faChartSimple;
  dropdownCloseIcon = faCaretLeft;
  dropdownOpenIcon = faCaretDown;

  userApps: string[];

  constructor(
    private readonly router: Router,
    private readonly jwt: JwtService
  ) {}

  ngOnInit(): void {
    this.userApps = this.jwt.getApps();
  }

  open() {
    document.getElementById('sideBarNav').style.width = '250px';
    this.isOpen = true;
  }

  close() {
    document.getElementById('sideBarNav').style.width = '0';
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  route(path: string) {
    this.close();
    this.router.navigate([path]);
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
    return document.getElementById(id).style.maxHeight ===
      this.MAX_DROPDOWN_HEIGHT
      ? this.dropdownOpenIcon
      : this.dropdownCloseIcon;
  }
}
