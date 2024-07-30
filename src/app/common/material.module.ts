import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * Material Module
 *
 * @author Sam Butler
 * @since August 18, 2022
 */
@NgModule({
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}
