import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
@Component({
  selector: 'app-guardian-warning-modal',
  templateUrl: './guardian-warning-modal.component.html',
})
export class GuardianWarningModalComponent {
  @ViewChild('guardianWarningModal') modal: ModalComponent;
  @Output() acknowledged = new EventEmitter<void>();

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onAcknowledged() {
    this.acknowledged.emit();
  }
}
