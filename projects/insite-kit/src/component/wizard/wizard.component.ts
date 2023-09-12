import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { WizardHelperService } from './wizard-helper.service';
import {
  Status,
  WizardStepHelperService,
} from './wizard-step/wizard-step-helper.service';
import { WizardStepComponent } from './wizard-step/wizard-step.component';

@Component({
  selector: 'ik-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent
  extends WizardStepHelperService
  implements OnInit, AfterContentInit
{
  itemLength: number;

  @Input() public set selectedIndex(value) {
    this.activeIndex = value || 0;
  }

  @Output() public stateChange = new EventEmitter<{
    activeIndex: number;
    activeStep: WizardStepComponent;
  }>();

  @ContentChildren(WizardStepComponent)
  public steps: QueryList<WizardStepComponent>;

  constructor(protected wizardHelper: WizardHelperService) {
    super(wizardHelper);
  }

  ngOnInit(): void {
    this.wizardHelper.eventHelper.subscribe({
      next: ({ prev, next }) => {
        if (next) {
          this.next();
        }

        if (prev) {
          this.prev();
        }
      },
    });
  }

  ngAfterContentInit() {
    this.initProgress(this.progressSteps.length);
    this.setActiveStep(this.activeIndex);
    this.initStepIndex();
  }

  public next() {
    this.increaseStep();
  }

  public prev() {
    this.decreaseStep();
  }

  private increaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status !== Status.COMPLETED
    ) {
      this.completeLastStep();
    }

    if (this.activeIndex < this.itemLength - 1) {
      this.activeIndex++;
      this.switchStatusNext(this.activeIndex);
      this.setActiveStep(this.activeIndex);
      this.emitStateChange();
    }
  }

  private decreaseStep() {
    if (
      this.activeIndex === this.itemLength - 1 &&
      this.itemProgressList[this.activeIndex].status === Status.COMPLETED
    ) {
      this.undoLastComplete();
    } else {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.switchStatusPrev(this.activeIndex);
        this.setActiveStep(this.activeIndex);
        this.emitStateChange();
      }
    }
  }

  private emitStateChange(): void {
    this.stateChange.emit({
      activeIndex: this.activeIndex,
      activeStep: this.activeStep,
    });
  }

  private setActiveStep(index: number): void {
    if (this.stepsExists) {
      this.removeActiveStep();
      this.updateActiveStep(index);
    }
  }

  private updateActiveStep(index) {
    this.progressSteps[index].activeState = this.progressSteps[index];
  }

  private removeActiveStep() {
    this.progressSteps.map((step) => {
      if (step.isActive) {
        step.isActive = false;
      }
    });
  }

  private initStepIndex() {
    this.progressSteps.forEach((step, i) => (step.stepIndex = i));
  }

  public get activeStep(): WizardStepComponent {
    return this.progressSteps[this.activeIndex];
  }

  private get stepsExists(): boolean {
    return this.progressSteps && Array.isArray(this.progressSteps);
  }

  private get progressSteps(): WizardStepComponent[] {
    return this.steps.toArray();
  }

  protected generateProgressArray(length): any[] {
    return [...Array(length).keys()].map((key) => {
      return {
        stepIndex: key,
        status: key === this.activeIndex ? Status.IN_PROGRESS : Status.PENDING,
      };
    });
  }

  private initProgress(value): void {
    this.itemLength = value || 0;
    this.itemProgressList = this.generateProgressArray(this.itemLength);
  }
}
