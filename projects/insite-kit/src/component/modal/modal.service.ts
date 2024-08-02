import { Injectable } from '@angular/core';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly dialog: MatDialog) {}

  public open<T, D>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, any> {
    const combinedConfig = {
      width: '500px',
      maxWidth: '95vw',
      position: { top: '50px' },
      panelClass: 'ik-modal-dialog',
      ...config,
    };
    return this.dialog.open(component, combinedConfig);
  }
}
