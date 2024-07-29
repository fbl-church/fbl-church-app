import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedCardsModule } from './components/cards/shared-cards.module';
import { SharedFormsModule } from './components/forms/shared-forms.module';
import { SharedGridsModule } from './components/grids/shared-grids.module';
import { SharedHeadersModule } from './components/headers/shared-headers.module';
import { SharedLayoutsModule } from './components/layouts/shared-layouts.module';
import { SharedModalsModule } from './components/modals/shared-modals.module';
import { SharedPagesModule } from './components/pages/shared-pages.module';
import { SharedWizardsModule } from './components/wizards/shared-wizards.module';
@NgModule({
  exports: [
    SharedCardsModule,
    SharedFormsModule,
    SharedGridsModule,
    SharedHeadersModule,
    SharedLayoutsModule,
    SharedModalsModule,
    SharedPagesModule,
    SharedWizardsModule,
    QRCodeModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
