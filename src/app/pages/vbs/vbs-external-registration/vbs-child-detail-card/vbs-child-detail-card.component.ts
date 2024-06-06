import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Child } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-vbs-child-detail-card',
  templateUrl: './vbs-child-detail-card.component.html',
})
export class VBSChildDetailCardComponent {
  @Input() child: Child;
  @Input() title = 'Details';
  @Input() showEdit = true;
  @Output() editClick = new EventEmitter<any>();

  onEditIconClick() {
    this.editClick.emit();
  }
}
