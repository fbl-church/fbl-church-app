import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Gurdian } from 'projects/insite-kit/src/model/clubber.model';

@Component({
  selector: 'app-gurdian-details-card',
  templateUrl: './gurdian-details-card.component.html',
  styleUrls: ['./gurdian-details-card.component.scss'],
})
export class GurdianDetailsCardComponent {
  @Input() gurdian: Gurdian;
  @Input() title = 'Details';
  @Input() editEnabled = false;
  @Input() loading = false;
  @Output() editClick = new EventEmitter<any>();

  editIcon = faPenToSquare;

  onEditIconClick() {
    this.editClick.emit();
  }
}
