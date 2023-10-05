import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Observer, iif, of, switchMap } from 'rxjs';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';
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

  @ViewChild('duplicateChildModal') duplicateChildModal: ModalComponent;

  loading = false;
  disableSave = false;
  savedChildData: Child;
  duplicateChild: Child;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  onCancelClick() {
    this.router.navigate(['/children']);
  }

  onSaveClick(child: Child) {
    const guardians = this.guardianSelectionGrid.getSelectedGuardians();
    child.guardians = guardians;
    this.savedChildData = child;
    this.duplicateChild = null;

    if (!this.validGuardians(guardians)) {
      return;
    }

    this.processCreateChild();
  }

  processCreateChild() {
    this.childrenService
      .doesChildExist(this.savedChildData)
      .pipe(
        switchMap((u) =>
          iif(
            () => !!u.body,
            this.onDuplicateChild(u.body),
            this.createChild(!!u.body)
          )
        )
      )
      .subscribe(this.childCreationObserver());
  }

  onDuplicateChild(child: Child) {
    if (!!child) {
      this.loading = false;
      this.disableSave = false;
      this.duplicateChild = child;
      this.duplicateChildModal.open();
    }

    return of(null);
  }

  onDuplicateChildAcknowledgement() {
    this.loading = true;
    this.disableSave = true;
    this.duplicateChildModal.close();
    this.createChild().subscribe(this.childCreationObserver());
  }

  onNoGuardianAcknowledgement() {
    this.gurardianWarningModal.close();
    this.processCreateChild();
  }

  validGuardians(guardians: any[]): boolean {
    if (guardians.length < 1) {
      this.gurardianWarningModal.open();
      return false;
    }
    return true;
  }

  createChild(duplicateChild = false) {
    if (!duplicateChild) {
      this.loading = true;
      this.disableSave = true;
    }
    return this.childrenService.create(this.savedChildData);
  }

  childCreationObserver(): Partial<Observer<Child>> {
    return {
      next: (child) => {
        if (!!child) {
          this.router.navigate([`/children/${child.id}/details`]);
          this.popupService.success('Child Successfully created!');
        }
      },
      error: () => {
        this.popupService.error('Child could not be created!');
        this.loading = false;
        this.disableSave = false;
      },
    };
  }
}
