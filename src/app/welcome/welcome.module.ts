import { NgModule } from '@angular/core';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { NewsModule } from './news/news.module';
import { RegistrationModule } from './registration/registration.module';

@NgModule({
  exports: [
    HomeModule,
    AboutModule,
    ContactModule,
    NewsModule,
    RegistrationModule,
  ],
})
export class WelcomeModule {}
