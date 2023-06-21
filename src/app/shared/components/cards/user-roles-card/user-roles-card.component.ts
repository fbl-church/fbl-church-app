import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-user-roles-card',
  templateUrl: './user-roles-card.component.html',
  styleUrls: ['./user-roles-card.component.scss'],
})
export class UserRolesCardComponent {
  @Input() user: User;
  @Input() enableEdit = true;

  WebRole = WebRole;
  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(private readonly router: Router) {}

  onEditIconClick() {}
}
