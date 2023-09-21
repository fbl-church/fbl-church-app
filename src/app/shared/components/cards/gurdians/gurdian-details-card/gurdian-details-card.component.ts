import { Component, Input } from '@angular/core';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { Gurdian } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-gurdian-details-card',
  templateUrl: './gurdian-details-card.component.html',
})
export class GurdianDetailsCardComponent {
  @Input() gurdian: Gurdian;
  @Input() title = 'Details';
  @Input() loading = false;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
}
