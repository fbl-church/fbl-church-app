import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [BaseInitModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
