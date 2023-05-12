import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-grid-selection-column',
  template: '',
})
export class GridSelectionColumnComponent {
  @Input() header = '';
  @Input() values: any[] = [];
  @Input() selections: Map<any, any> = new Map().set(3, 'Aunt');

  updateSelection(data: { id: any; selectionValue: any }, selected: boolean) {
    if (selected) {
      this.addSelection(data);
    } else {
      this.removeSelection(data.id);
    }
  }

  addSelection(data: { id: any; selectionValue: any }) {
    this.selections.set(data.id, data.selectionValue);
  }

  removeSelection(id: any) {
    if (this.selections.has(id)) {
      this.selections.delete(id);
    }
  }

  getSelections() {
    return this.selections;
  }
}
