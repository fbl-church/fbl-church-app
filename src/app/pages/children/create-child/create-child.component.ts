import { Component, ViewChild } from '@angular/core';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';
import { DuplicateChildModalComponent } from 'src/app/shared/components/modals/duplicate-child-modal/duplicate-child-modal.component';
import { GuardianWarningModalComponent } from 'src/app/shared/components/modals/guardian-warning-modal/guardian-warning-modal.component';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
})
export class CreateChildComponent {
  @ViewChild(ChildGuardiansGridCardComponent)
  guardianSelectionGrid: ChildGuardiansGridCardComponent;

  @ViewChild(GuardianWarningModalComponent)
  gurardianWarningModal: GuardianWarningModalComponent;

  @ViewChild(DuplicateChildModalComponent)
  duplicateChildModal: DuplicateChildModalComponent;

  loading = false;
  savedChildData: Child;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.navigationService.back('/children');
  }

  onSaveClick(child: Child) {
    const guardians = this.guardianSelectionGrid.getSelectedGuardians();
    child.guardians = guardians;
    this.savedChildData = child;

    if (!this.validGuardians(guardians)) {
      return;
    }

    this.createChild();
  }

  onNoGuardianAcknowledgement() {
    this.gurardianWarningModal.close();
    this.createChild();
  }

  validGuardians(guardians: any[]): boolean {
    if (guardians.length < 1) {
      this.gurardianWarningModal.open();
      return false;
    }
    return true;
  }

  createChild() {
    this.loading = true;
    this.childrenService.create(this.savedChildData).subscribe({
      next: (child) => {
        this.navigationService.navigate(`/children/${child.id}/details`, false);
        this.popupService.success('Child Successfully created!');
      },
      error: () => {
        this.popupService.error('Child could not be created!');
        this.loading = false;
      },
    });
  }
}
