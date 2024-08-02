import { Component, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
})
export class AuthenticatedLayoutComponent implements OnInit {
  innerWidth: any;
  IPAD_SIZE = 850;

  constructor(private readonly navigationService: NavigationService) {}

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

  onScheduleRoute() {
    this.navigationService.navigate('/profile/schedule');
  }
}
