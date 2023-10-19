import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import {
  Relationship,
  TranslationKey,
} from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { GuardianService } from 'src/service/guardians/guardian.service';
import { DuplicateGuardianModalComponent } from '../duplicate-guardian-modal/duplicate-guardian-modal.component';

@Component({
  selector: 'app-add-guardian-modal',
  templateUrl: './add-guardian-modal.component.html',
})
export class AddGuardianModalComponent implements OnInit {
  @ViewChild('addGuardianModal') modal: ModalComponent;
  @ViewChild(DuplicateGuardianModalComponent)
  duplicateGuardianModal: DuplicateGuardianModalComponent;
  @Input() loading = false;
  @Output() save = new EventEmitter<Guardian>();

  savedGuardianData: Guardian;
  form: FormGroup;
  relationships: any[];
  disableSave = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService,
    private readonly guardianService: GuardianService
  ) {}

  ngOnInit() {
    this.relationships = Object.keys(Relationship).map((v) => {
      return {
        name: this.commonService.translate(v, TranslationKey.RELATIONSHIP),
        value: v,
      };
    });
    this.buildForm();
  }

  open() {
    this.loading = false;
    this.disableSave = false;
    this.form.reset();
    this.modal.open();
  }

  close() {
    this.modal.close();
    this.duplicateGuardianModal.close();
  }

  onSaveGuardianClick() {
    this.disableSave = true;
    this.loading = true;

    const createdGuardian: Guardian = {
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim(),
      relationship: this.form.value.relationship.value,
      phone: this.form.value.phone.trim(),
    };

    this.savedGuardianData = createdGuardian;
    this.guardianService
      .doesGuardianExist(this.savedGuardianData)
      .subscribe((g) => {
        if (g.body) {
          this.modal.close();
          this.duplicateGuardianModal.open(g.body);
        } else {
          this.saveGuardian();
        }
      });
  }

  saveGuardian() {
    this.save.emit(this.savedGuardianData);
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      relationship: ['', Validators.required],
    });
  }
}
