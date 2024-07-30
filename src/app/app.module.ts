import { NgModule } from '@angular/core';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SplashScreenLayoutComponent } from './shared/components/layouts/splash-screen-layout/splash-screen-layout.component';

@NgModule({
  imports: [InsiteKitModule.forRoot(environment), BaseInitModule, PagesModule],
  declarations: [AppComponent, SplashScreenLayoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
