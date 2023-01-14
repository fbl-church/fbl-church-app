import { TestModuleMetadata } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { LoginModule } from 'src/app/login/login.module';
import { WelcomeModule } from 'src/app/welcome/welcome.module';
import { AbstractTestBed } from './abstract-test-bed';

export class AppTestBed extends AbstractTestBed {
  static getModuleMetaData(): TestModuleMetadata {
    return {
      imports: [BaseInitModule, WelcomeModule, LoginModule],
      declarations: [AppComponent],
      providers: [],
    };
  }
}
