import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InsiteKitModule } from 'insite-kit';
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
  ],
})
export class BaseInitModule {}
