import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { InsiteKitModule } from 'projects/insite-kit/src/insite-kit.module';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
@NgModule({
  declarations: [AuthenticatedLayoutComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule.forRoot(environment),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  exports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    InsiteKitModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    AuthenticatedLayoutComponent,
  ],
})
export class SharedModule {}
