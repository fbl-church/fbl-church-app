import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
})
export class UserDetailsCardComponent {
  @Input() user: User;
  @Input() title = 'Details';
  @Input() loading = false;
  @Input() featureAccess = [];
  @Output() editClick = new EventEmitter<any>();

  WebRole = WebRole;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  darkThemeEnabled = false;

  onEditIconClick() {
    this.editClick.emit();
  }

  updateTheme() {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    document.body.setAttribute('data-theme', this.darkThemeEnabled ? 'dark' : 'light');
  }
}
