import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Gurdian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-junior-church-registration-wizard',
  templateUrl: './junior-church-registration-wizard.component.html',
})
export class JuniorChurchRegistrationWizardComponent {
  currentChildInformation: Child;

  constructor(
    private readonly router: Router,
    private readonly popupService: PopupService,
    private readonly childrenService: ChildrenService
  ) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onStep1Next(child: Child, wizard: WizardComponent) {
    this.currentChildInformation = child;
    console.log('Child Information', this.currentChildInformation);
    wizard.next();
  }

  onStep2Next(gurdians: Gurdian[], wizard: WizardComponent) {
    this.currentChildInformation.gurdians = gurdians;
    wizard.next();
  }

  onSaveClick() {
    this.childrenService.create(this.currentChildInformation).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success(
          `${this.currentChildInformation.firstName} ${this.currentChildInformation.lastName} has successfully been registered for Junior Church!`
        );
      },
      error: () => {
        this.popupService.error(
          'Unable to create and register user at this time. Try again later'
        );
      },
    });
  }
}
