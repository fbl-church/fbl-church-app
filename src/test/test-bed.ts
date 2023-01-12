import { TestModuleMetadata } from '@angular/core/testing';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { AppComponent } from 'src/app/app.component';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { PagesModule } from 'src/app/pages/pages.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbstractTestBed } from './abstract-test-bed';

export class AppTestBed extends AbstractTestBed {
  static getModuleMetaData(): TestModuleMetadata {
    return {
      imports: [InsiteKitModule, BaseInitModule, PagesModule, SharedModule],
      declarations: [AppComponent],
      providers: [],
    };
  }
}
