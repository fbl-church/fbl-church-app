import { WizardHelperService } from '../wizard-helper.service';

export enum UiState {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}

export enum Status {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export class WizardStepHelperService {
  public itemProgressList: { stepIndex: number; status: string }[] = [];
  public activeIndex = 0;

  constructor(protected wizardHelper: WizardHelperService) {}

  protected completeLastStep() {
    this.itemProgressList[this.activeIndex].status = Status.COMPLETED;
  }

  protected undoLastComplete() {
    this.itemProgressList[this.activeIndex].status = Status.IN_PROGRESS;
  }

  protected switchStatusNext(index): void {
    this.itemProgressList[this.activeIndex - 1].status = Status.COMPLETED;
    this.itemProgressList[index].status = Status.IN_PROGRESS;
  }

  protected switchStatusPrev(index) {
    this.itemProgressList[this.activeIndex + 1].status = Status.PENDING;
    this.itemProgressList[index].status = Status.IN_PROGRESS;
  }

  protected setCurrentToInProgress(index) {
    this.itemProgressList[index].status = Status.IN_PROGRESS;
  }

  protected resetProgress() {
    this.itemProgressList.forEach((item) => (item.status = Status.PENDING));
    this.itemProgressList[0].status = Status.IN_PROGRESS;
  }

  protected setFutureToPending(index) {
    this.itemProgressList.forEach((item, i) => {
      if (i > index) {
        item.status = Status.PENDING;
      }
    });
  }

  protected setPastToComplete(index) {
    this.itemProgressList.forEach((item, i) => {
      if (i < index) {
        item.status = Status.COMPLETED;
      }
    });
  }
}
