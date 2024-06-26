import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ik-card-header-collapsible',
  templateUrl: 'card-header-collapsible.component.html',
})
export class CardHeaderCollapsibleComponent {
  @HostBinding('class') hostClass = 'card-header';

  @Input() title: string;
  @Input() collapsed = false;
  collapseChange = new BehaviorSubject<boolean>(null);

  @HostListener('click') headerClick() {
    this.collapsed = !this.collapsed;
    this.collapseChange.next(this.collapsed);
    this.hostClass = `card-header ${this.collapsed ? 'card-header--closed' : ''}`;
  }
}
