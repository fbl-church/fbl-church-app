import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  imports: [BaseInitModule, WelcomeModule, LoginModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
