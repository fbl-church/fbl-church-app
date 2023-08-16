import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child } from 'projects/insite-kit/src/model/child.model';

@Component({
  selector: 'app-junior-church-registration-wizard',
  templateUrl: './junior-church-registration-wizard.component.html',
})
export class JuniorChurchRegistrationWizardComponent {
  currentChildInformation: Child;

  constructor(private readonly router: Router) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onStep1Next(child: Child, wizard: WizardComponent) {
    this.currentChildInformation = child;
    wizard.next();
  }
}
