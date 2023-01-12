import { Component, ContentChild, Input } from '@angular/core';
import { HeaderBackComponent } from './header-back/header-back.component';

@Component({
  selector: 'ik-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ContentChild(HeaderBackComponent) backArrow: HeaderBackComponent;
  @Input() title: string;

  onBackClick() {
    this.backArrow.onBackClick();
  }
}
