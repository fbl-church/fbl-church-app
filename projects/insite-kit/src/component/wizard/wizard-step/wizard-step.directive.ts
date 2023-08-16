import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { WizardHelperService } from '../wizard-helper.service';

@Directive({
  selector: '[wizardStepNext], [wizardStepPrev]',
})
export class WizardStepDirective implements OnInit {
  @Input('wizardStepNext') next;
  @Input('wizardStepPrev') prev;

  private methods = {
    next: false,
    prev: false,
  };

  @HostListener('click', ['$event']) listen(e) {
    this.wizardHelperService.eventHelper.next(this.methods);
  }

  constructor(private wizardHelperService: WizardHelperService) {}

  ngOnInit() {
    this.initMethods();
  }

  private initMethods(): void {
    if ('next' in this) {
      this.methods = {
        ...this.methods,
        next: true,
      };
    }

    if ('prev' in this) {
      this.methods = {
        ...this.methods,
        prev: true,
      };
    }
  }
}
