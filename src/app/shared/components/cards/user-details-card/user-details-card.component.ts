import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent {
  @Input() user: User;
  @Input() title = 'Details';
  @Input() loading = false;
  @Output() editClick = new EventEmitter<any>();

  WebRole = WebRole;
  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  onEditIconClick() {
    this.editClick.emit();
  }
}
