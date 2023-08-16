import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ik-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss'],
})
export class WizardStepComponent implements OnInit {
  public stepIndex: number;

  @HostBinding('class.activeStep')
  public isActive = false;

  @Input() public set activeState(step) {
    this.isActive = step === this;
  }

  constructor() {}

  ngOnInit(): void {}
}
