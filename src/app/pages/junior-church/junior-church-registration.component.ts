import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-junior-church-registration',
  templateUrl: './junior-church-registration.component.html',
})
export class JuniorChurchRegistrationComponent {
  constructor(private readonly router: Router) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }
}
