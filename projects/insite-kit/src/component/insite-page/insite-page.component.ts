import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'ik-insite-page',
  templateUrl: 'insite-page.component.html',
})
export class InsitePageComponent {
  @Input() appName: string;

  constructor(@Inject('env') public env: any) {}
}
