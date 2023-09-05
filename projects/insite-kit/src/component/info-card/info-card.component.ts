import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ik-info-card',
  templateUrl: './info-card.component.html',
})
export class InfoCardComponent {
  @Input() description: string;
  @Input() title: string;
  @Input() pageRoute: string;

  constructor(private router: Router) {}

  routeToApp() {
    if (this.pageRoute) {
      this.router.navigate([this.pageRoute]);
    }
  }
}
