import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-grid-checklist-column',
  template: '',
})
export class GridChecklistColumnComponent {
  @Input() selectedIds: number[] = [];

  updateSelectedId(data: any) {
    if (data.selected) {
      this.addId(data.id);
    } else {
      this.removeId(data.id);
    }
  }

  setSelectedIds(newIds: number[]) {
    this.selectedIds = [...newIds];
  }

  addId(id: number) {
    if (this.selectedIds.includes(id)) {
      return;
    } else {
      this.selectedIds.push(id);
    }
  }

  removeId(id: number) {
    const index = this.selectedIds.findIndex((i) => i === id);
    if (index > 0) {
      delete this.selectedIds[index];
    }
  }

  getSelected() {
    return this.selectedIds;
  }
}
