import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { ChildrenService } from 'src/service/children/children.service';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-child-registration-wizard-step-four',
  templateUrl: './child-registration-4.wizard.step.html',
})
export class ChildRegistrationWizardStepFourComponent implements OnChanges {
  @Input() child: Child;
  @Input() loading = true;
  @Input() wizardData: WizardData;
  @Output() save = new EventEmitter<Child>();
  @Output() previous = new EventEmitter<void>();

  activeChild: Child;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly childrenService: ChildrenService,
    private readonly guardianService: GuardianService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.loading = true;
    if (changes.child && changes.child.currentValue) {
      if (this.child?.id) {
        this.childrenService.getById(this.child.id).subscribe((res) => {
          this.activeChild = res.body;
          this.activeChild.churchGroup.push(this.wizardData.registrationGroup);
          this.loading = false;
        });
      } else {
        if (this.child?.guardians) {
          this.getGuardiansInformation();
        }
      }
    }
  }

  getGuardianRelationship(guardianId: number) {
    return this.child.guardians.find((g) => g.id === guardianId).relationship;
  }

  getGuardiansInformation() {
    if (this.child.guardians && this.child.guardians.length > 0) {
      this.guardianService
        .get(
          new Map().set(
            'id',
            this.child.guardians.map((g) => g.id)
          )
        )
        .subscribe((res) => {
          this.activeChild = { ...this.child };
          this.activeChild.guardians = res.body;
          this.activeChild.guardians.forEach((g) => (g.relationship = this.getGuardianRelationship(g.id)));
          this.loading = false;
        });
    } else {
      this.activeChild = { ...this.child };
      this.loading = false;
    }
  }

  onCancelClick() {
    this.navigationService.navigate(`${this.wizardData.baseRoute}/check-in`);
  }

  onPreviousClick() {
    this.previous.next();
  }

  onSaveClick() {
    this.save.emit(this.activeChild);
  }
}
