import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
})
export class CreateChildComponent {
  @ViewChild(ChildGuardiansGridCardComponent)
  guardianSelectionGrid: ChildGuardiansGridCardComponent;

  loading = false;
  disableSave = false;

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
    if (!this.validGuardians(guardians)) {
      return;
    }
    child.guardians = guardians;

    this.loading = true;
    this.disableSave = true;
    this.childrenService.create(child).subscribe({
      next: (res) => {
        this.router.navigate([`/children/${res.id}/details`]);
        this.popupService.success('Child Successfully created!');
      },
      error: () => {
        this.popupService.error('Child could not be created!');
        this.loading = false;
        this.disableSave = false;
      },
    });
  }

  validGuardians(guardians: any[]): boolean {
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
