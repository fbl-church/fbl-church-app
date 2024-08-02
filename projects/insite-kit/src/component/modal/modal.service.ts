import { Injectable } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly dialog: MatDialog) {}

  public open<T, D>(component: ComponentType<T>, config?: MatDialogConfig<D>) {
    const combinedConfig = {
      width: '500px',
      position: { top: '50px' },
      panelClass: 'ik-modal-dialog',
      ...config,
    };
    this.dialog.open(component, combinedConfig);
  }
}
