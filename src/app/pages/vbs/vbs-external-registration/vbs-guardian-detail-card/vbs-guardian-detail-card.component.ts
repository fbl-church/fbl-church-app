import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Guardian } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-vbs-guardian-detail-card',
  templateUrl: './vbs-guardian-detail-card.component.html',
})
export class VBSGuardianDetailCardComponent {
  @Input() guardian: Guardian;
  @Input() title = 'Details';
  @Input() showEdit = true;
  @Output() editClick = new EventEmitter<any>();

  onEditIconClick() {
    this.editClick.emit();
  }
}
