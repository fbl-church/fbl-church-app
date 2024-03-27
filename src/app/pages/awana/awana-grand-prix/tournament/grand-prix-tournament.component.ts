import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-grand-prix-tournament',
  templateUrl: './grand-prix-tournament.component.html',
})
export class GrandPrixTournamentComponent {
  @HostBinding('class.gp-tournament') hostClass = true;
}
