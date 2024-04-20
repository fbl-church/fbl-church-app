import { Component, OnInit } from '@angular/core';
import { Access, App, FeatureType } from '../../model/common.model';
import { UserAccessService } from '../../service/auth/user-access.service';
import { NavigationService } from '../../service/navigation/navigation.service';
import { NAVIGATION_ROUTES } from './sidebar.config';

@Component({
  selector: 'ik-sidebar',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  navigationConfig = NAVIGATION_ROUTES;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private readonly userAccessService: UserAccessService, private navigationService: NavigationService) {}

  ngOnInit() {
    this.userAccessService.user$.subscribe((ua) => {
      this.navigationConfig = NAVIGATION_ROUTES.filter((n) => ua.apps.includes(n.id));
    });
  }

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  onRoute(path: string) {
    this.navigationService.navigate(path);
    this.close();
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
