import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/child.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ChildGurdiansGridCardComponent } from 'src/app/shared/components/cards/child-gurdians-grid-card/child-gurdians-grid-card.component';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
})
export class CreateChildComponent implements OnInit {
  @ViewChild(ChildGurdiansGridCardComponent)
  gurdianSelectionGrid: ChildGurdiansGridCardComponent;

  loading = true;
  disableSave = false;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.loading = false;
  }

  onCancelClick() {
    this.router.navigate(['/children']);
  }

  onSaveClick(child: Child) {
    const gurdians = this.gurdianSelectionGrid.getSelectedGurdians();
    if (!this.validGurdians(gurdians)) {
      return;
    }
    child.gurdians = gurdians;

    this.loading = true;
    this.disableSave = true;
    this.childrenService.create(child).subscribe({
      next: () => {
        this.router.navigate([`/children`]);
        this.popupService.success('Child Successfully created!');
      },
      error: () => {
        this.popupService.error('Child could not be created!');
        this.loading = false;
        this.disableSave = false;
      },
    });
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
