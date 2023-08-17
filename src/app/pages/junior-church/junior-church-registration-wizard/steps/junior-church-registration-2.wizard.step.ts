import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Gurdian } from 'projects/insite-kit/src/model/child.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildGurdiansGridCardComponent } from 'src/app/shared/components/cards/child-gurdians-grid-card/child-gurdians-grid-card.component';

@Component({
  selector: 'app-junior-church-registration-wizard-step-two',
  templateUrl: './junior-church-registration-2.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepTwoComponent {
  @ViewChild(ChildGurdiansGridCardComponent)
  gurdianSelectionGrid: ChildGurdiansGridCardComponent;
  @Output() next = new EventEmitter<Gurdian[]>();

  constructor(
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onNextClick() {
    const gurdians = this.gurdianSelectionGrid.getSelectedGurdians();
    if (this.validGurdians(gurdians)) {
      this.next.emit(gurdians);
    }
  }

  validGurdians(gurdians: any[]): boolean {
    if (gurdians.length < 1) {
      this.popupService.error(
        'Child is required to have at least one gurdian assigned to them.'
      );
      return false;
    }

    if (gurdians.filter((res) => res?.relationship === null).length > 0) {
      this.popupService.error(
        'All selected gurdians must have a relationship selected.'
      );
      return false;
    }

    return true;
  }
}
