import { Component, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
})
export class AuthenticatedLayoutComponent implements OnInit {
  innerWidth: any;
  IPAD_SIZE = 768;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  closeSidenav(sidenav: MatSidenav) {
    if (innerWidth <= this.IPAD_SIZE) {
      sidenav.toggle();
    }
  }
}
