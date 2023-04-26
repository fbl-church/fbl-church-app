import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { ClubberGurdiansGridCardComponent } from './clubber-gurdians-grid-card/clubber-gurdians-grid-card.component';

@Component({
  selector: 'app-clubber-form',
  templateUrl: './clubber-form.component.html',
  styleUrls: ['./clubber-form.component.scss'],
})
export class ClubberFormComponent implements OnInit {
  @ViewChild(ClubberGurdiansGridCardComponent)
  checklistGrid: ClubberGurdiansGridCardComponent;

  @Input() clubberData: Clubber;
  @Input() rightActionButton: string;
  @Input() leftActionButton: string;
  @Input() disableSave = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<Clubber>();

  roles: string[];
  churchGroups: string[];
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.churchGroups = Object.keys(ChurchGroup);
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [
        this.clubberData ? this.clubberData.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.clubberData ? this.clubberData.lastName : '',
        Validators.required,
      ],
      churchGroup: [
        this.clubberData ? this.clubberData.churchGroup : ChurchGroup.CUBBIES,
        Validators.required,
      ],
      birthday: this.clubberData
        ? this.clubberData.birthday.toString().split('T')[0]
        : '',
      allergies: [this.clubberData ? this.clubberData.allergies : ''],
      additionalInfo: [this.clubberData ? this.clubberData.additionalInfo : ''],
    });
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onSaveClick() {
    const gurdians = this.checklistGrid.getSelectedGurdians();
    if (!this.validGurdians(gurdians)) {
      return;
    }

    let newClubber: Clubber = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      churchGroup: this.form.value.churchGroup,
      gurdians: gurdians,
    };

    if (this.form.value.birthday) {
      newClubber.birthday = this.form.value.birthday;
    }

    if (this.form.value.allergies) {
      newClubber.allergies = this.form.value.allergies;
    }

    if (this.form.value.additionalInfo) {
      newClubber.additionalInfo = this.form.value.additionalInfo;
    }

    this.save.emit(newClubber);
  }

  validGurdians(gurdians: any[]): boolean {
    if (gurdians.length < 1) {
      this.popupService.error(
        'Clubber is required to have at least one gurdian assigned to them.'
      );
      return false;
    }

    if (gurdians.filter((res) => res?.relationship === null).length > 0) {
      this.popupService.error(
        'All selected gurdians must have a relationship selected.'
      );
      return false;
    }

    return true;
  }
}
