import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-child-registration-wizard',
  templateUrl: './child-registration-wizard.component.html',
})
export class ChildRegistrationWizardComponent implements OnInit, OnDestroy {
  currentChildInformation: Child;
  wizardData: WizardData;
  childExists = false;
  loading = false;
  destroy = new Subject<void>();

  constructor(
    private readonly navigationService: NavigationService,
    private readonly popupService: PopupService,
    private readonly childrenService: ChildrenService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.wizardData),
        tap((res) => (this.wizardData = res)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onCancelClick() {
    this.navigationService.navigate(`${this.wizardData.baseRoute}/check-in`);
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

  onStep3Next(guardians: Guardian[], wizard: WizardComponent) {
    this.currentChildInformation = { ...this.currentChildInformation };
    this.currentChildInformation.guardians = guardians;
    wizard.next();
  }

  onStep4Previous(wizard: WizardComponent) {
    if (this.childExists) {
      wizard.prev();
    }
    wizard.prev();
  }

  onSaveClick(child: Child) {
    this.loading = true;
    let saveObservable: Observable<Child>;
    if (this.childExists && child.id) {
      saveObservable = this.childrenService.update(child.id, child);
    } else {
      saveObservable = this.childrenService.create(child);
    }
    saveObservable.subscribe({
      next: () => {
        this.navigationService.navigate(`${this.wizardData.baseRoute}/children`);
        this.popupService.success(
          `${child.firstName} ${child.lastName} has successfully been registered for ${this.wizardData.translation}!`
        );
      },
      error: () => {
        this.popupService.error('Unable to register child at this time. Try again later');
      },
    });
  }
}
