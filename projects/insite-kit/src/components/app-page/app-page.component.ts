import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss'],
})
export class AppPageComponent {
  @Input() appName: string;
}
