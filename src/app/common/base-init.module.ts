import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxColorsModule } from 'ngx-colors';
import { CardModule } from 'projects/insite-kit/src/component/card/card.module';
import { FormComponent } from 'projects/insite-kit/src/component/form/form.component';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { GridModule } from 'projects/insite-kit/src/component/grid/grid.module';
import { BasicModalComponent } from 'projects/insite-kit/src/component/modal/basic-modal.component';
import { UploadComponent } from 'projects/insite-kit/src/component/upload/upload.component';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
/**
 * Base init module will export all the needed modules for a component
 * to build. These will be imported into all the page modules and be
 * used in the test bed as well/
 *
 * @author Sam Butler
 * @since August 18, 2022
 */
@NgModule({
  imports: [GridComponent, UploadComponent, FormComponent, BasicModalComponent],
  exports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InsiteKitModule,
    NgSelectModule,
    NgxColorsModule,
    GridModule,
    CardModule,
    UploadComponent,
    FormComponent,
    BasicModalComponent,
  ],
})
export class BaseInitModule {}
