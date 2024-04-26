import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-grid-selection-column',
  template: '',
})
export class GridSelectionColumnComponent {
  @Input() header = '';
  @Input() values: { name: string; value: any }[] = [];
  @Input() selections: { id: any; value: any }[] = [];

  updateSelection(data: { id: any; value: any }, selected: boolean) {
    if (selected) {
      this.addSelection(data);
    } else {
      this.removeSelection(data.id);
    }
  }

  addSelection(data: { id: any; value: any }) {
    if (this.selections.find((d) => d.id === data.id)) {
      this.removeSelection(data.id);
    }
    this.selections.push(data);
  }

  removeSelection(id: any) {
    this.selections = this.selections.filter((s) => s.id !== id);
  }

  getSelections() {
    return this.selections ? this.selections : [];
  }
}
