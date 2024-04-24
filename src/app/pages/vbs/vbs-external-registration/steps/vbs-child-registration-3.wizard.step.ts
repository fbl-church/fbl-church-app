import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { ChildGuardiansGridCardComponent } from 'src/app/shared/components/cards/children/child-guardians-grid-card/child-guardians-grid-card.component';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-three',
  templateUrl: './vbs-child-registration-3.wizard.step.html',
})
export class VBSChildRegistrationWizardStepThreeComponent implements OnInit {
  @ViewChild(ChildGuardiansGridCardComponent)
  guardianSelectionGrid: ChildGuardiansGridCardComponent;

  @Input() wizardData: WizardData;
  @Output() next = new EventEmitter<Guardian[]>();

  guardianForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly navigationService: NavigationService) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.guardianForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      releaseOfLiability: [false],
    });
  }

  onCancelClick() {
    this.navigationService.navigate(`${this.wizardData.baseRoute}/check-in`);
  }

  onNextClick() {
    const guardians = this.guardianSelectionGrid.getSelectedGuardians();
    this.next.emit(guardians);
  }
}
