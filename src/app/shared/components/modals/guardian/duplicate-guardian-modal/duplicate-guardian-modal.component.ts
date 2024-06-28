import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Child, Guardian } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-duplicate-guardian-modal',
  templateUrl: './duplicate-guardian-modal.component.html',
})
export class DuplicateGuardianModalComponent {
  @ViewChild('duplicateGuardianModal') modal: ModalComponent;
  @Input() loading = false;
  @Output() acknowledged = new EventEmitter<void>();

  duplicateGuardian: Child;

  open(g: Guardian) {
    this.loading = false;
    this.duplicateGuardian = g;
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onDuplicateGuardianAcknowledgement() {
    this.modal.close();
    this.acknowledged.emit();
  }
}
