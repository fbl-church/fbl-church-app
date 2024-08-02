import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'ik-card-header',
  templateUrl: 'card-header.component.html',
  imports: [MatCardModule, CommonModule],
})
export class CardHeaderComponent {
  @Input() title: string;
  @Input() border = true;
}
