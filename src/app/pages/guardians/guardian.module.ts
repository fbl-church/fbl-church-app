import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateGuardianComponent } from './create-guardian/create-guardian.component';
import { ExistingUserGuardianComponent } from './create-guardian/existing-user-guardian/existing-user-guardian.component';
import { UserToGuardianModalComponent } from './create-guardian/existing-user-guardian/modals/user-to-guardian-modal/user-to-guardian-modal.component';
import { GuardianDetailComponent } from './guardian-detail/guardian-detail.component';
import { DeleteGuardianModalComponent } from './guardian-detail/modals/delete-guardian-modal/delete-guardian-modal.component';
import { EditGuardianComponent } from './guardian-detail/pages/edit-guardian/edit-guardian.component';
import { GuardianComponent } from './guardian.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    GuardianComponent,
    GuardianDetailComponent,
    DeleteGuardianModalComponent,
    CreateGuardianComponent,
    EditGuardianComponent,
    ExistingUserGuardianComponent,
    UserToGuardianModalComponent,
  ],
})
export class GuardianModule {}
