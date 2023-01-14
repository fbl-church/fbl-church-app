import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/shared/modules/base-init.module';
import { ContactOverviewComponent } from './contact-overview/contact-overview.component';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [ContactComponent, ContactOverviewComponent],
})
export class ContactModule {}
