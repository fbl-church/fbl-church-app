import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../service/auth/jwt.service';
import { NAVIGATION_ROUTES } from './sidebar.config';

@Component({
  selector: 'ik-sidebar',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  navigationConfig = NAVIGATION_ROUTES;
  userApps: string[];

  constructor(private readonly jwt: JwtService) {}

  ngOnInit() {
    this.userApps = this.jwt.getApps();
    this.navigationConfig = NAVIGATION_ROUTES.filter((n) =>
      this.userApps.includes(n.id)
    );
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
