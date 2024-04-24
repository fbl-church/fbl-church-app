import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridSelectionColumnComponent } from 'projects/insite-kit/src/component/grid/grid-selection-column/grid-selection-column.component';
import { TagInputFieldComponent } from 'projects/insite-kit/src/component/tag-input-field/tag-input-field.component';
import { ChurchGroup, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { WizardData } from 'projects/insite-kit/src/model/wizard.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { VBSService } from 'src/service/vbs/vbs.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-two',
  templateUrl: './vbs-child-registration-2.wizard.step.html',
})
export class VBSChildRegistrationWizardStepTwoComponent implements OnInit {
  @ViewChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;
  @ViewChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;
  @ViewChildren(TagInputFieldComponent) tagInputField: QueryList<TagInputFieldComponent>;

  @Input() wizardData: WizardData;
  @Input() childExists = false;
  @Output() next = new EventEmitter<Child[]>();

  childrenDataloader: any;
  loading = false;
  childForms: FormGroup[] = [];
  churchGroups: any[];

  childGroups = [
    ChurchGroup.VBS_PRE_PRIMARY,
    ChurchGroup.VBS_PRIMARY,
    ChurchGroup.VBS_JUNIOR,
    ChurchGroup.VBS_MIDDLER,
    ChurchGroup.VBS_PRIMARY,
  ];

  constructor(
    private readonly navigationService: NavigationService,
    private readonly vbsService: VBSService,
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService
  ) {
    this.childrenDataloader = (params) => this.vbsService.getGuardianVbsChildren(params);
  }

  ngOnInit() {
    this.addChildForm();
    this.churchGroups = Object.keys(ChurchGroup)
      .filter((v) => this.childGroups.includes(ChurchGroup[v]))
      .map((cg) => {
        return {
          value: cg,
          name: this.commonService.translate(cg, TranslationKey.CHURCH_GROUP),
        };
      });
  }

  onCancelClick() {
    this.childForms = [];
    this.addChildForm();
  }

  onNextClick() {
    this.next.emit(this.childExists ? this.getSelectedChildren() : this.getCreatedChildren());
  }

  addChildForm() {
    const newChildForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: [this.commonService.formatDate(new Date(), 'yyyy-MM-dd'), Validators.required],
      group: ['', Validators.required],
      additionalInfo: [''],
    });
    this.childForms.push(newChildForm);
  }

  onRemoveChildClick(index: any) {
    this.childForms.splice(index, 1);
  }

  getCreatedChildren(): Child[] {
    return this.childForms.map((form, i) => {
      let newChild: Child = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        churchGroup: [form.value.group],
        releaseOfLiability: form.value.releaseOfLiability,
      };

      if (form.value.birthday) {
        newChild.birthday = form.value.birthday;
      }

      const allergieTags = this.getChildAllergiesByIndex(i);
      if (allergieTags && allergieTags.length > 0) {
        newChild.allergies = allergieTags;
      }

      if (form.value.additionalInfo) {
        newChild.additionalInfo = form.value.additionalInfo;
      }
      return newChild;
    });
  }

  getSelectedChildren(): Child[] {
    if (this.gridChecklistColumn) {
      const selectedIds = this.gridChecklistColumn.getSelected();
      return this.gridSelection
        .getSelections()
        .filter((g) => selectedIds.includes(g.id))
        .map((g) => {
          return { id: g.id, churchGroup: [g.value] };
        });
    } else {
      return [];
    }
  }

  getChildAllergiesByIndex(index: any): string[] {
    return this.tagInputField.find((t) => t.uniqueId === `tagInput-${index}`).getTags();
  }

  disableNext(): boolean {
    if (this.childExists) {
      return !(this.getSelectedChildren().length > 0);
    } else {
      return !this.childForms.map((f) => f.valid).every((validForm) => validForm);
    }
  }
}
