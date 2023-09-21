import { Component, Input } from '@angular/core';

@Component({
  selector: 'ik-grid-checklist-column',
  template: '',
})
export class GridChecklistColumnComponent {
  @Input() selectedIds: any[] = [];

  updateSelectedId(data: any) {
    if (data.selected) {
      this.addId(data.id);
    } else {
      this.removeId(data.id);
    }
  }

  addId(id: any) {
    if (this.selectedIds.includes(id)) {
      return;
    } else {
      this.selectedIds.push(id);
    }
  }

  removeId(id: any) {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter((i) => i !== id);
    }
  }

  isSelected(id: any) {
    return this.selectedIds.includes(id);
  }

  getSelected() {
    return this.selectedIds;
  }
}
