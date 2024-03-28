import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ik-footer',
  templateUrl: 'footer.component.html',
})
export class FooterComponent {
  @HostBinding('class.app-footer') hostClass = true;
}
