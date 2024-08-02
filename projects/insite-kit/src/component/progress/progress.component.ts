import { NgStyle } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ik-progress',
  templateUrl: 'progress.component.html',
  standalone: true,
  imports: [NgStyle],
})
export class ProgressComponent {
  @HostBinding('class.progress-bar') hostClass = true;
  @Input() progress = 0;
}
