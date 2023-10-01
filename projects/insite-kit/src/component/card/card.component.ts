import {
  AfterContentInit,
  Component,
  ContentChild,
  HostBinding,
} from '@angular/core';
import { CardHeaderCollapsibleComponent } from './card-header-collapsible/card-header-collapsible.component';

@Component({
  selector: 'ik-card',
  templateUrl: 'card.component.html',
})
export class CardComponent implements AfterContentInit {
  @HostBinding('class.card') hostClass = true;
  @ContentChild(CardHeaderCollapsibleComponent)
  collapsibleHeader: CardHeaderCollapsibleComponent;

  contentClosed = false;
  isCollapsibleContent = false;

  ngAfterContentInit(): void {
    if (this.collapsibleHeader) {
      this.isCollapsibleContent = true;
      this.collapsibleHeader.collapseChange
        .asObservable()
        .subscribe((res) => (this.contentClosed = !!res));
    }
  }
}
