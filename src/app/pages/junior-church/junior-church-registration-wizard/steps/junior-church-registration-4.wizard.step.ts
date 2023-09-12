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
import { GurdianService } from 'src/service/gurdians/gurdian.service';

@Component({
  selector: 'app-junior-church-registration-wizard-step-four',
  templateUrl: './junior-church-registration-4.wizard.step.html',
})
export class JuniorChurchRegistrationWizardStepFourComponent
  implements OnChanges
{
  @Input() child: Child;
  @Output() save = new EventEmitter<Child>();
  @Output() previous = new EventEmitter<void>();

  activeChild: Child;
  loading = true;

  constructor(
    private readonly router: Router,
    private readonly childrenService: ChildrenService,
    private readonly gurdianService: GurdianService,
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
        if (this.child?.gurdians) {
          this.gurdianService
            .get(
              new Map().set(
                'id',
                this.child.gurdians.map((g) => g.id)
              )
            )
            .subscribe((res) => {
              this.activeChild = { ...this.child };
              this.activeChild.gurdians = res.body;
              this.activeChild.gurdians.forEach(
                (g) =>
                  (g.formattedRelationship = this.getGurdianRelationship(g.id))
              );
              this.loading = false;
            });
        }
      }
    }
  }

  getGurdianRelationship(gurdianId: number) {
    const found = this.child.gurdians.find((g) => g.id === gurdianId);
    return this.commonService.getFormattedRelationship(found.relationship);
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
