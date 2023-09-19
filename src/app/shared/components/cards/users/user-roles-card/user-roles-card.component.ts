import { Component, Input } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-user-roles-card',
  templateUrl: './user-roles-card.component.html',
})
export class UserRolesCardComponent {
  @Input() user: User;

  editIcon = faPenToSquare;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;
}
