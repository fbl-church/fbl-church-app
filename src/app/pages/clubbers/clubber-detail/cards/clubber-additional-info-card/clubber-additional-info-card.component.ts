import { Component, Input } from '@angular/core';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';

@Component({
  selector: 'app-clubber-additional-info-card',
  templateUrl: './clubber-additional-info-card.component.html',
  styleUrls: ['./clubber-additional-info-card.component.scss'],
})
export class ClubberAdditionalInfoCardCardComponent {
  @Input() clubber: Clubber;
}
