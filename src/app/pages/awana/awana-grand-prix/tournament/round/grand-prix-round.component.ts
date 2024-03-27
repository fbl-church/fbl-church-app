import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-grand-prix-round',
  templateUrl: './grand-prix-round.component.html',
})
export class GrandPrixRoundComponent {
  @HostBinding('class.gp-players') hostClass = true;
}
