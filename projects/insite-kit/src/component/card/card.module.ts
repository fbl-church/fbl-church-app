import { NgModule } from '@angular/core';
import { CardChipComponent } from './card-chip/card-chip.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CardComponent, CardHeaderComponent, CardChipComponent, CardInfoComponent],
  exports: [CardComponent, CardHeaderComponent, CardChipComponent, CardInfoComponent],
})
export class CardModule {}
