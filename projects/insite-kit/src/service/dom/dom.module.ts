import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DOMService } from './dom.service';
import { GeometryService } from './geometry.service';
import { PositionDirective } from './position.directive';
import { PositionService } from './position.service';

@NgModule({
  imports: [CommonModule],
  declarations: [PositionDirective],
  exports: [PositionDirective],
  providers: [PositionService, DOMService, GeometryService],
})
export class DOMModule {}
