import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  @Input() title: string;
}
