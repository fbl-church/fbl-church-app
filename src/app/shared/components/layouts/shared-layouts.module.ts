import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { UnauthenticatedLayoutComponent } from './unauthenticated-layout/unauthenticated-layout.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [AuthenticatedLayoutComponent, UnauthenticatedLayoutComponent],
  exports: [AuthenticatedLayoutComponent, UnauthenticatedLayoutComponent],
})
export class SharedLayoutsModule {}
