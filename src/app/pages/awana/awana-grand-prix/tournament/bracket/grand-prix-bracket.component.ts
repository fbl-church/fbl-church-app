import { Component, HostBinding, Input } from '@angular/core';
import { GrandPrixUser } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-grand-prix-bracket',
  templateUrl: './grand-prix-bracket.component.html',
})
export class GrandPrixBracketComponent {
  @HostBinding('class.gp-bracket-container') hostClass = true;
  @Input() racers: GrandPrixUser[];
}
