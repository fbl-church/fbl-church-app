import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';

@Component({
  selector: 'app-clubber-details-card',
  templateUrl: './clubber-details-card.component.html',
  styleUrls: ['./clubber-details-card.component.scss'],
})
export class ClubberDetailsCardComponent {
  @Input() clubber: Clubber;
  @Input() title = 'Details';
  @Input() loading = false;
  @Output() editClick = new EventEmitter<any>();

  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  onEditIconClick() {
    this.editClick.emit();
  }
}
