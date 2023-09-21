import { Component, Input } from '@angular/core';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { Guardian } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-guardian-details-card',
  templateUrl: './guardian-details-card.component.html',
})
export class GuardianDetailsCardComponent {
  @Input() guardian: Guardian;
  @Input() title = 'Details';
  @Input() loading = false;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
}
