import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { UnauthenticatedLayoutComponent } from './unauthenticated-layout/unauthenticated-layout.component';

@NgModule({
  imports: [BaseInitModule, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule],
  declarations: [AuthenticatedLayoutComponent, UnauthenticatedLayoutComponent],
  exports: [AuthenticatedLayoutComponent, UnauthenticatedLayoutComponent],
})
export class SharedLayoutsModule {}
