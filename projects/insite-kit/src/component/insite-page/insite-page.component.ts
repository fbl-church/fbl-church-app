import { Component, HostBinding, Inject, Input } from '@angular/core';

@Component({
  selector: 'ik-insite-page',
  templateUrl: 'insite-page.component.html',
})
export class InsitePageComponent {
  @HostBinding('class.flex') hostClass = true;
  @Input() appName: string;

  constructor(@Inject('env') public env: any) {}
}
