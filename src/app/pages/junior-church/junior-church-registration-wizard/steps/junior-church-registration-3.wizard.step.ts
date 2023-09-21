import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';

@Component({
  selector: 'app-junior-church-registration-wizard-step-three',
  templateUrl: './junior-church-registration-3.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepThreeComponent {
  @ViewChild(ChildGuardiansGridCardComponent)
  guardianSelectionGrid: ChildGuardiansGridCardComponent;
  @Output() next = new EventEmitter<Guardian[]>();

  constructor(
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onNextClick() {
    const guardians = this.guardianSelectionGrid.getSelectedGuardians();
    if (this.validGuardians(guardians)) {
      this.next.emit(guardians);
    }
  }

  validGuardians(guardians: any[]): boolean {
    if (this.guardianSelectionGrid.isGuardianFormInvalid()) {
      this.popupService.error(
        'New Guardian form is not valid. Please confirm all required fields are filled out.'
      );
      return false;
    }

    if (guardians.length < 1) {
      this.popupService.error(
        'Child is required to have at least one guardian assigned to them.'
      );
      return false;
    }

    if (guardians.filter((res) => res?.relationship === null).length > 0) {
      this.popupService.error(
        'All selected guardians must have a relationship selected.'
      );
      return false;
    }

    return true;
  }
}
