import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { AwanaNavbarComponent } from './components/awana-navbar/awana-navbar.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [AuthenticatedLayoutComponent, AwanaNavbarComponent],
  exports: [AwanaNavbarComponent],
})
export class SharedModule {}
