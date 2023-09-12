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
  childExists = false;

  constructor(
    private readonly router: Router,
    private readonly popupService: PopupService,
    private readonly childrenService: ChildrenService
  ) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onStep1Next(exists: boolean, wizard: WizardComponent) {
    this.childExists = exists;
    wizard.next();
  }

  onStep2Next(child: Child, wizard: WizardComponent) {
    this.currentChildInformation = child;
    if (this.childExists) {
      wizard.next();
    }
    wizard.next();
  }

  onStep3Next(gurdians: Gurdian[], wizard: WizardComponent) {
    this.currentChildInformation = { ...this.currentChildInformation };
    this.currentChildInformation.gurdians = gurdians;
    wizard.next();
  }

  onStep4Previous(wizard: WizardComponent) {
    if (this.childExists) {
      wizard.prev();
    }
    wizard.prev();
  }

  onBackClick() {
    this.router.navigate(['/junior-church']);
  }

  onSaveClick(child: Child) {
    let saveObservable;
    if (this.childExists && child.id) {
      saveObservable = this.childrenService.update(child.id, child);
    } else {
      saveObservable = this.childrenService.create(child);
    }
    saveObservable.subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success(
          `${child.firstName} ${child.lastName} has successfully been registered for Junior Church!`
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
