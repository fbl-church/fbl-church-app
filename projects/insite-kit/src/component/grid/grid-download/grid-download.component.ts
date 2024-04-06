import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ik-grid-download',
  templateUrl: './grid-download.component.html',
})
export class GridDownloadComponent {
  @Input() loading = false;
  @Output() download = new EventEmitter<void>();

  onDownloadClick() {
    this.download.emit();
  }
}
