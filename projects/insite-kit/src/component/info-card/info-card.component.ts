import { Component, Input } from '@angular/core';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';

@Component({
  selector: 'ik-info-card',
  templateUrl: './info-card.component.html',
})
export class InfoCardComponent {
  @Input() description: string;
  @Input() title: string;
  @Input() pageRoute: string;

  constructor(private navigationService: NavigationService) {}

  routeToApp() {
    if (this.pageRoute) {
      this.navigationService.navigate(this.pageRoute);
    }
  }
}
