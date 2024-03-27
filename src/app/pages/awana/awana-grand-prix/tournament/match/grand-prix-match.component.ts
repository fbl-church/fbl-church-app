import { AfterContentInit, Component, ContentChildren, HostBinding, QueryList } from '@angular/core';
import { GrandPrixBracketComponent } from '../bracket/grand-prix-bracket.component';

@Component({
  selector: 'app-grand-prix-match',
  templateUrl: './grand-prix-match.component.html',
})
export class GrandPrixMatchComponent implements AfterContentInit {
  @HostBinding('class.gp-match') hostClass = true;
  @ContentChildren(GrandPrixBracketComponent) brackets: QueryList<GrandPrixBracketComponent>;

  loadComplete = false;

  ngAfterContentInit() {
    this.loadComplete = true;
  }
}
