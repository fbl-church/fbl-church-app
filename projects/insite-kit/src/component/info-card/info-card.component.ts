import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ik-info-card',
  templateUrl: './info-card.component.html',
})
export class InfoCardComponent {
  @Input() description: string;
  @Input() title: string;
  @Input() titleColor: string;
  @Input() titleFont = '22px';
  @Input() descriptionFont = '18px';
  @Input() pageRoute: string;
  @Input() textAlign = 'center';
  @Input() marginTop = '50px';
  @Input() marginBottom = '50px';

  constructor(private router: Router) {}

  routeToApp() {
    if (this.pageRoute) {
      this.router.navigate([this.pageRoute]);
    }
  }
}
