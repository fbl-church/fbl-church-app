import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Access,
  App,
  Feature,
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
  @Output() editClick = new EventEmitter<any>();

  editIcon = faPenToSquare;

  Feature = Feature;
  Application = App;
  Access = Access;

  onEditIconClick() {
    this.editClick.emit();
  }
}
