import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-child-details-card',
  templateUrl: './child-details-card.component.html',
})
export class ChildDetailsCardComponent {
  @Input() child: Child;
  @Input() title = 'Details';
  @Input() loading = false;
  @Input() showEdit = true;
  @Output() editClick = new EventEmitter<any>();

  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  onEditIconClick() {
    this.editClick.emit();
  }
}
