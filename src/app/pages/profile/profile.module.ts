import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileChildDetailsComponent } from './profile-child-details/profile-child-details.component';
import { ProfileChildEditComponent } from './profile-child-details/profile-child-edit/profile-child-edit.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    UpdatePasswordComponent,
    ProfileChildDetailsComponent,
    ProfileChildEditComponent,
  ],
})
export class ProfileModule {}
