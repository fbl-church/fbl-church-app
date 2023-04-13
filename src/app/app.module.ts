import { NgModule } from '@angular/core';
import { InsiteKitModule } from 'insite-kit';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    InsiteKitModule.forRoot(environment),
    BaseInitModule,
    SharedModule,
    PagesModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
