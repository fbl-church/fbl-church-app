import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-existing-user-gurdian',
  templateUrl: './existing-user-gurdian.component.html',
})
export class ExistingUserGurdianComponent {
  constructor(private readonly router: Router) {}

  onCancelClick() {
    this.router.navigate(['/gurdians/create']);
  }
}
