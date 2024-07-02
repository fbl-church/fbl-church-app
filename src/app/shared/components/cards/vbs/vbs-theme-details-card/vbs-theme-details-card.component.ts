import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Access, App, FeatureType, WebRole } from 'projects/insite-kit/src/model/common.model';
import { VBSTheme } from 'projects/insite-kit/src/model/vbs.model';

@Component({
  selector: 'app-vbs-theme-details-card',
  templateUrl: './vbs-theme-details-card.component.html',
})
export class VBSThemeDetailsCardComponent {
  @Input() theme: VBSTheme;
  @Input() title = 'Details';
  @Input() editEnabled = false;
  @Output() editClick = new EventEmitter<VBSTheme>();

  WebRole = WebRole;
  FeatureType = FeatureType;
  Application = App;
  Access = Access;
}
