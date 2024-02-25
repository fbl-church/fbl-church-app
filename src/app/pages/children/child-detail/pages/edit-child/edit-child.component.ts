import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
})
export class EditChildComponent implements OnInit, OnDestroy {
  loading = true;
  destroy = new Subject<void>();
  childId: number;
  childUpdating: Child;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly childrenService: ChildrenService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.data
      .pipe(
        map((res) => res.child.body),
        tap((res) => (this.childId = res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((child) => {
        this.childUpdating = child;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.navigationService.back('/users');
  }

  onSaveClick(child: Child) {
    this.loading = true;
    this.childrenService.update(this.childId, child).subscribe({
      next: () => {
        this.onCancelClick();
        this.popupService.success('Child Successfully updated!');
      },
      error: () => {
        this.popupService.error('Child could not be updated at this time!');
        this.loading = false;
      },
    });
  }
}
