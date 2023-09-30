import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ik-card-header-collapsible',
  templateUrl: 'card-header-collapsible.component.html',
})
export class CardHeaderCollapsibleComponent {
  @HostBinding('class.card__header') hostClass = true;
  @HostBinding('class.card__header--closed') hostClosedClass = false;

  @Input() title: string;
  @Input() collapsed = false;
  collapseChange = new BehaviorSubject<boolean>(null);

  @HostListener('click') headerClick() {
    this.collapsed = !this.collapsed;
    this.collapseChange.next(this.collapsed);
    this.hostClass = !this.collapsed;
    this.hostClosedClass = this.collapsed;
  }
}
