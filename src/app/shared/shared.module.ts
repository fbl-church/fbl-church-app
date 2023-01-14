import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { AwanaNavbarComponent } from './components/awana-navbar/awana-navbar.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { IntroductionSectionComponent } from './components/introduction-section/introduction-section.component';

@NgModule({
  imports: [
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
  declarations: [
    AuthenticatedLayoutComponent,
    AwanaNavbarComponent,
    BaseLayoutComponent,
    IntroductionSectionComponent,
  ],
  exports: [AwanaNavbarComponent, IntroductionSectionComponent],
})
export class SharedModule {}
