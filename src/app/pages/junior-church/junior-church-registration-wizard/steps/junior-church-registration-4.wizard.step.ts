import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { ChildrenService } from 'src/service/children/children.service';
import { GuardianService } from 'src/service/guardians/guardian.service';

@Component({
  selector: 'app-junior-church-registration-wizard-step-four',
  templateUrl: './junior-church-registration-4.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepFourComponent
  implements OnChanges
{
  @Input() child: Child;
  @Input() loading = true;
  @Output() save = new EventEmitter<Child>();
  @Output() previous = new EventEmitter<void>();

  activeChild: Child;

  constructor(
    private readonly router: Router,
    private readonly childrenService: ChildrenService,
    private readonly guardianService: GuardianService,
    private readonly commonService: CommonService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.child && changes.child.currentValue) {
      if (this.child?.id) {
        this.childrenService.getById(this.child.id).subscribe((res) => {
          this.activeChild = res.body;
          this.activeChild.churchGroup.push(ChurchGroup.JUNIOR_CHURCH);
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
        this.activeChild.guardians.forEach(
          (g) => (g.relationship = this.getGuardianRelationship(g.id))
        );
        this.loading = false;
      });
  }

  onCancelClick() {
    this.router.navigate(['/junior-church/check-in']);
  }

  onPreviousClick() {
    this.previous.next();
  }

  onSaveClick() {
    this.save.emit(this.activeChild);
  }
}
