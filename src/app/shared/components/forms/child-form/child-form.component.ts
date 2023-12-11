import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagInputFieldComponent } from 'projects/insite-kit/src/component/tag-input-field/tag-input-field.component';
import { ChurchGroup, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { ChildrenService } from 'src/service/children/children.service';
import { DuplicateChildModalComponent } from '../../modals/duplicate-child-modal/duplicate-child-modal.component';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
})
export class ChildFormComponent implements OnInit {
  @ViewChild(DuplicateChildModalComponent)
  duplicateChildModal: DuplicateChildModalComponent;
  @ViewChild(TagInputFieldComponent) tagInputField: TagInputFieldComponent;

  @Input() childData: Child;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() duplicateCheck = true;
  @Input() groupEdit = true;
  @Input() loading = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Child>();

  churchGroups: any[];
  form: FormGroup;

  savedChildData: Child;
  duplicateChildData: Child;
  disableSave = false;
  currentAllergieTags: string[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService,
    private readonly childrenService: ChildrenService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.churchGroups = Object.keys(ChurchGroup)
      .filter((v) => ChurchGroup.AWANA !== v)
      .map((cg) => {
        return {
          value: cg,
          name: this.commonService.translate(cg, TranslationKey.CHURCH_GROUP),
        };
      });
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [this.childData?.firstName ? this.childData.firstName : '', Validators.required],
      lastName: [this.childData?.lastName ? this.childData.lastName : '', Validators.required],
      birthday: [
        this.childData?.birthday ? this.childData.birthday : this.commonService.formatDate(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
      groups: [this.childData?.churchGroup ? this.childData.churchGroup : ''],
      additionalInfo: [this.childData ? this.childData.additionalInfo : ''],
      releaseOfLiability: [this.childData ? this.childData.releaseOfLiability : false],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    this.disableSave = true;
    this.loadingChange.emit(true);

    let newChild: Child = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      releaseOfLiability: this.form.value.releaseOfLiability,
    };

    if (this.form.value.birthday) {
      newChild.birthday = this.form.value.birthday;
    }

    const allergieTags = this.tagInputField.getTags();
    if (allergieTags && allergieTags.length > 0) {
      newChild.allergies = allergieTags;
    }

    if (this.form.value.additionalInfo) {
      newChild.additionalInfo = this.form.value.additionalInfo;
    }

    if (this.form.value.groups) {
      newChild.churchGroup = this.form.value.groups;
    }

    this.savedChildData = newChild;
    if (this.duplicateCheck) {
      this.childrenService.doesChildExist(newChild).subscribe((c) => {
        if (c.body) {
          this.duplicateChildModal.open(c.body);
          this.loadingChange.emit(false);
        } else {
          this.saveChild();
        }
        this.disableSave = false;
      });
    } else {
      this.saveChild();
    }
  }

  saveChild() {
    this.save.emit(this.savedChildData);
  }
}
