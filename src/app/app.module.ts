import { NgModule } from '@angular/core';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { BaseInitModule } from 'src/app/shared/modules/base-init.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './welcome/pages.module';

@NgModule({
  imports: [InsiteKitModule, BaseInitModule, SharedModule, PagesModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
