import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-indicator-light',
  templateUrl: 'indicator-light.component.html',
})
export class IndicatorLightComponent {
  @Input() status: 'success' | 'warning' | 'error' = 'success';
}
