import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
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
  @Input() featureRestriction = [App.CHILDREN, FeatureType.DETAIL, Access.UPDATE];
  @Output() editClick = new EventEmitter<any>();

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  onEditIconClick() {
    this.editClick.emit();
  }
}
