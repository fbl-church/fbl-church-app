import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';

@Component({
  selector: 'app-clubber-details-card',
  templateUrl: './clubber-details-card.component.html',
  styleUrls: ['./clubber-details-card.component.scss'],
})
export class ClubberDetailsCardComponent implements OnInit {
  @Input() clubber: Clubber;
  @Input() title = 'Details';
  @Input() editEnabled = false;
  @Input() loading = false;
  @Output() editClick = new EventEmitter<any>();

  lastLoginFieldAccess = false;
  editIcon = faPenToSquare;

  constructor(private readonly jwt: JwtService) {}

  ngOnInit() {
    this.lastLoginFieldAccess =
      Number(WebRole[this.jwt.get('webRole')]) === WebRole.ADMIN;
  }

  onEditIconClick() {
    this.editClick.emit();
  }
}
