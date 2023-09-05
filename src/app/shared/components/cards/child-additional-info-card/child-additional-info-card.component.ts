import { Component, Input } from '@angular/core';
import { Child } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-child-additional-info-card',
  templateUrl: './child-additional-info-card.component.html',
})
export class ChildAdditionalInfoCardCardComponent {
  @Input() child: Child;
}
