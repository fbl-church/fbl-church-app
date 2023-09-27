import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';
import { GuardianWarningModalComponent } from '../../../modals/guardian-warning-modal/guardian-warning-modal.component';

@Component({
  selector: 'app-child-registration-wizard-step-three',
  templateUrl: './child-registration-3.wizard.step.html',
})
export class ChildRegistrationWizardStepThreeComponent {
  @ViewChild(ChildGuardiansGridCardComponent)
  guardianSelectionGrid: ChildGuardiansGridCardComponent;
  @ViewChild(GuardianWarningModalComponent)
  guardianWarningModal: GuardianWarningModalComponent;

  @Input() wizardData: WizardData;
  @Output() next = new EventEmitter<Guardian[]>();

  constructor(
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.router.navigate([`${this.wizardData.baseRoute}/check-in`]);
  }

  onNextClick() {
    const guardians = this.guardianSelectionGrid.getSelectedGuardians();
    if (this.validGuardians(guardians)) {
      this.next.emit(guardians);
    }
  }

  onNoGuardianAcknowledgement() {
    this.guardianWarningModal.close();
    this.next.emit([]);
  }

  validGuardians(guardians: any[]): boolean {
    if (guardians.length < 1) {
      this.guardianWarningModal.open();
      return false;
    }

    return true;
  }
}
