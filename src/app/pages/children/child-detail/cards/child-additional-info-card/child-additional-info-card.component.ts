import { Component, Input } from '@angular/core';
import { Child } from 'projects/insite-kit/src/model/child.model';

@Component({
  selector: 'app-child-additional-info-card',
  templateUrl: './child-additional-info-card.component.html',
  styleUrls: ['./child-additional-info-card.component.scss'],
})
export class ChildAdditionalInfoCardCardComponent {
  @Input() child: Child;
}
