import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-grid-checklist-column',
  template: '',
})
export class GridChecklistColumnComponent {
  @Input() selectedIds: Set<number> = new Set();

  updateSelectedId(data: any) {
    if (data.selected) {
      this.addId(data.id);
    } else {
      this.removeId(data.id);
    }
  }

  setSelectedIds(newIds: number[]) {
    this.selectedIds = new Set(newIds);
  }

  addId(id: number) {
    if (this.selectedIds.has(id)) {
      return;
    } else {
      this.selectedIds.add(id);
    }
  }

  removeId(id: number) {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    }
  }

  getSelected() {
    return Array.from(this.selectedIds);
  }
}
