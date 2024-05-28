import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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

@Component({
  selector: 'app-vbs-child-registration-wizard-step-two',
  templateUrl: './vbs-child-registration-2.wizard.step.html',
})
export class VBSChildRegistrationWizardStepTwoComponent implements OnChanges, OnInit {
  @ViewChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;
  @ViewChild(GridSelectionColumnComponent)
  gridSelection: GridSelectionColumnComponent;
  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChildren(TagInputFieldComponent) tagInputField: QueryList<TagInputFieldComponent>;
  @ViewChild(ModalComponent) duplicateChildInformationModal: ModalComponent;

  @Input() wizard: WizardComponent;
  @Input() activeStep: number = 0;
  @Input() childExists = false;
  @Output() next = new EventEmitter<Child[]>();

  childrenDataloader: any;
  loading = false;
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

  constructor(
    private readonly vbsService: VBSService,
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService
  ) {
    this.childrenDataloader = (params) => this.vbsService.getGuardianVbsChildren(params);
  }

  ngOnInit() {
    this.wizard.wizardCancelled.subscribe(() => {
      if (this.childExists) {
        this.grid.resetGrid();
      } else {
        this.childForms = [];
      }
    });

    this.relationshipTypes = this.commonService.getDropDownItems(Relationship, TranslationKey.RELATIONSHIP);
    this.churchGroups = this.commonService.getDropDownItems(
      ChurchGroup,
      TranslationKey.CHURCH_GROUP,
      this.excludedGroups
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeStep && changes.activeStep.currentValue == 1 && this.childForms.length === 0) {
      this.addChildForm();
    }
  }

  onCancelClick() {
    this.wizard.resetWizard();
  }

  onNextClick() {
    if (this.hasDuplicateChildInformation()) {
      this.duplicateChildInformationModal.open();
    } else {
      this.next.emit(this.childExists ? this.getSelectedChildren() : this.getCreatedChildren());
    }
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
