import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'ik-basic-modal',
  templateUrl: 'basic-modal.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
    MatDialogModule,
    CommonModule,
  ],
})
export class BasicModalComponent {
  actionLeft$ = new Subject<void>();
  actionRight$ = new Subject<void>();

  loading = false;

  constructor(public dialogRef: MatDialogRef<BasicModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  protected onActionLeftClick(): void {
    this.dialogRef.close();
    this.actionLeft$.next();
  }

  protected onActionRightClick(): void {
    this.actionRight$.next();
  }
}
