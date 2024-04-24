import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-vbs-external-registration',
  templateUrl: './vbs-external-registration.component.html',
})
export class VBSExternalRegistrationComponent implements OnInit, OnDestroy {
  wizardData: WizardData;
  childrenToRegister: Child[];
  childExists = false;
  loading = false;
  disableSave = false;
  destroy = new Subject<void>();

  constructor(private readonly childrenService: ChildrenService, private readonly route: ActivatedRoute) {}

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

  onStep1Next(exists: boolean, wizard: WizardComponent) {
    this.childExists = exists;
    wizard.next();
  }

  onStep2Next(children: Child[], wizard: WizardComponent) {
    this.childrenToRegister = children;
    if (this.childExists) {
      wizard.next();
    }
    wizard.next();
  }

  onStep3Next(guardians: Guardian[], wizard: WizardComponent) {
    wizard.next();
  }

  onPrevious(wizard: WizardComponent) {
    console.log('PREVIOUS CALLED');
    wizard.prev();
  }

  onCancelClick() {}

  onSaveClick(event?: any) {}
}
