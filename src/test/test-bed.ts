import { TestModuleMetadata } from '@angular/core/testing';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { AppComponent } from 'src/app/app.component';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { PagesModule } from 'src/app/pages/pages.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbstractTestBed } from './abstract-test-bed';
import { TEST_ENVIRONMENT } from './test-env';

export class FBAwanaTestBed extends AbstractTestBed {
  static getModuleMetaData(): TestModuleMetadata {
    return {
      imports: [
        InsiteKitModule.forRoot(TEST_ENVIRONMENT),
        BaseInitModule,
        PagesModule,
        SharedModule,
      ],
      declarations: [AppComponent],
      providers: [],
    };
  }
}
