import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'ik-card-header-new',
  templateUrl: 'card-header-new.component.html',
  imports: [MatCardModule, CommonModule],
})
export class CardHeaderNewComponent {
  @Input() title: string;
}
