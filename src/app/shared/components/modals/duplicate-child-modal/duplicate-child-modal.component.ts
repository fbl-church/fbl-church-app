import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { Child } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-duplicate-child-modal',
  templateUrl: './duplicate-child-modal.component.html',
})
export class DuplicateChildModalComponent {
  @ViewChild('duplicateChildModal') modal: ModalComponent;
  @Output() acknowledged = new EventEmitter<void>();

  duplicateChild: Child;

  open(c: Child) {
    this.duplicateChild = c;
    this.modal.open();
  }

  onDuplicateChildAcknowledgement() {
    this.modal.close();
    this.acknowledged.emit();
  }
}
