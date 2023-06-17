import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
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
}
