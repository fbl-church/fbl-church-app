import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [ProfileComponent, ProfileEditComponent],
})
export class ProfileModule {}
