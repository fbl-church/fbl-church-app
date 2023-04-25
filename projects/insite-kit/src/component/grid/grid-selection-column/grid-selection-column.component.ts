import { Component, Input } from '@angular/core';
import { Relationship } from 'projects/insite-kit/src/model/common.model';

@Component({
  selector: 'ik-grid-selection-column',
  template: '',
})
export class GridSelectionColumnComponent {
  @Input() header = '';
  @Input() values: any[] = [];
  @Input() selections: Map<any, any> = new Map<any, any>();

  updateSelection(
    data: { id: any; relationship: Relationship },
    selected: boolean
  ) {
    if (selected) {
      this.addSelection(data);
    } else {
      this.removeSelection(data.id);
    }
  }

  addSelection(data: { id: any; relationship: Relationship }) {
    this.selections.set(data.id, data.relationship);
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
