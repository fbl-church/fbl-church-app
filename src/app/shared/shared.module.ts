import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/shared/modules/base-init.module';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { AwanaNavbarComponent } from './components/awana-navbar/awana-navbar.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [
    AuthenticatedLayoutComponent,
    AwanaNavbarComponent,
    BaseLayoutComponent,
  ],
  exports: [AwanaNavbarComponent],
})
export class SharedModule {}
