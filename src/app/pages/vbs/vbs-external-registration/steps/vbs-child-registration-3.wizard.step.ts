import { Component, Input, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridSelectionColumnComponent } from 'projects/insite-kit/src/component/grid/grid-selection-column/grid-selection-column.component';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { DropdownItem } from 'projects/insite-kit/src/component/select/dropdown-item.model';
import { TagInputFieldComponent } from 'projects/insite-kit/src/component/tag-input-field/tag-input-field.component';
import { WizardComponent } from 'projects/insite-kit/src/component/wizard/wizard.component';
import { ChurchGroup, Relationship, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { VBSService } from 'src/service/vbs/vbs.service';
import { VBSExternalRegistrationWizardDataService } from '../vbs-external-registration-wizard-data.service';

@Component({
  selector: 'app-vbs-child-registration-wizard-step-three',
  templateUrl: './vbs-child-registration-3.wizard.step.html',
})
export class VBSChildRegistrationWizardStepThreeComponent implements OnChanges, OnInit {
  @ViewChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;
  @ViewChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;
  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChildren(TagInputFieldComponent) tagInputField: QueryList<TagInputFieldComponent>;
  @ViewChild(ModalComponent) duplicateChildInformationModal: ModalComponent;

  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;

  childrenDataloader: any;
  childForms: FormGroup[] = [];
  churchGroups: DropdownItem[];
  relationshipTypes: DropdownItem[];

  excludedGroups = [
    ChurchGroup.VBS_PRE_PRIMARY,
    ChurchGroup.VBS_PRIMARY,
    ChurchGroup.VBS_JUNIOR,
    ChurchGroup.VBS_MIDDLER,
    ChurchGroup.VBS_PRIMARY,
  ];
  guardianExists = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly vbsService: VBSService,
    private readonly commonService: CommonService,
    private readonly wizardDataService: VBSExternalRegistrationWizardDataService
  ) {}

  ngOnInit() {
    this.wizard.wizardCancelled.subscribe(() => (this.childForms = []));

    this.relationshipTypes = this.commonService.getDropDownItems(Relationship, TranslationKey.RELATIONSHIP);
    this.churchGroups = this.commonService.getDropDownItems(
      ChurchGroup,
      TranslationKey.CHURCH_GROUP,
      this.excludedGroups
    );
  }

  ngOnChanges() {
    if (this.activeStep === 2) {
      this.guardianExists = this.wizardDataService.data.guardianExists;

      if (this.guardianExists) {
        const id = this.wizardDataService.data.guardians[0].id;
        this.childrenDataloader = (params) => this.vbsService.getGuardianVbsChildren(id, params);
      } else {
        if (this.childForms.length === 0) {
          this.addChildForm();
        }
      }
    }
  }

  onNextClick() {
    if (this.hasDuplicateChildInformation()) {
      this.duplicateChildInformationModal.open();
    } else {
      const createdChildren = this.getCreatedChildren();
      if (createdChildren && createdChildren.length > 0) {
        this.wizardDataService.updateData({ children: [...this.getSelectedChildren(), ...createdChildren] });
        this.wizard.next();
      } else {
        this.wizardDataService.updateData({ children: this.getSelectedChildren() });
        this.wizard.goToStep(4);
      }
    }
  }

  onCancelClick() {
    this.wizard.resetWizard(this.wizardDataService);
  }

  addChildForm() {
    const newChildForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: [this.commonService.formatDate(new Date(), 'yyyy-MM-dd'), Validators.required],
      group: [null, Validators.required],
      additionalInfo: [''],
      releaseOfLiability: [false],
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
        churchGroup: [form.value.group.value],
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
        .filter((c) => selectedIds.includes(c.id))
        .map((c) => {
          return { id: c.id, churchGroup: [c.value] };
        });
    } else {
      return [];
    }
  }

  getChildAllergiesByIndex(index: any): string[] {
    return this.tagInputField.find((t) => t.uniqueId === `tagInput-${index}`).getTags();
  }

  disableNext(): boolean {
    if (this.guardianExists) {
      const invalidSelectedChildren = !(this.getSelectedChildren().length > 0);
      const hasNewChildForms = this.childForms && this.childForms.length > 0;

      if (hasNewChildForms) {
        if (this.gridChecklistColumn.getSelected().length > 0) {
          // There are selected children, validate the forms are valid and the drop down is selected
          return invalidSelectedChildren || !this.childForms.map((f) => f.valid).every((validForm) => validForm);
        }
      } else {
        // No child forms added, validate they selected at least one of the existing children
        return invalidSelectedChildren;
      }
    }
    // There are no selected children, just check the forms are valid
    return !this.childForms.map((f) => f.valid).every((validForm) => validForm);
  }

  hasDuplicateChildInformation() {
    const uniqueData = new Set(
      this.childForms.map((form) =>
        JSON.stringify({
          firstName: form.value.firstName.toLocaleLowerCase(),
          lastName: form.value.lastName.toLocaleLowerCase(),
        })
      )
    );
    return uniqueData.size !== this.childForms.length;
  }
}
