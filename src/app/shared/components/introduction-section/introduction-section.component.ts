import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-introduction-section',
  templateUrl: './introduction-section.component.html',
  styleUrls: ['./introduction-section.component.scss'],
})
export class IntroductionSectionComponent {
  @Input() introTitle = 'Title';
  @Input() introBody = 'Body';
  @Input() introBackground = '';
}
