import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ik-progress',
  templateUrl: 'progress.component.html',
})
export class ProgressComponent {
  @HostBinding('class.progress-bar') hostClass = true;
  @Input() progress = 0;
}
