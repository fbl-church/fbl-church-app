import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccessManagerApplicationsComponent } from './access-manager-applications/access-manager-applications.component';
import { ApplicationDetailComponent } from './access-manager-applications/application-detail/application-detail.component';
import { DeleteApplicationModalComponent } from './access-manager-applications/application-detail/modals/delete-application-modal/delete-application-modal.component';
import { WebRoleAppUpdateModalComponent } from './access-manager-applications/application-detail/modals/web-role-app-update-modal/web-role-app-update-modal.component';
import { CreateApplicationModalComponent } from './access-manager-applications/modals/create-application-modal/create-application-modal.component';
import { AccessManagerDeletedUsersComponent } from './access-manager-deleted-users/access-manager-deleted-users.component';
import { DeletedUsersDetailComponent } from './access-manager-deleted-users/deleted-users-detail/deleted-users-detail.component';
import { AccessManagerFeaturesComponent } from './access-manager-features/access-manager-features.component';
import { FeatureDetailComponent } from './access-manager-features/feature-detail/feature-detail.component';
import { DeleteFeatureModalComponent } from './access-manager-features/feature-detail/modals/delete-feature-modal/delete-feature-modal.component';
import { WebRoleFeatureUpdateModalComponent } from './access-manager-features/feature-detail/modals/web-role-feature-update-modal/web-role-feature-update-modal.component';
import { CreateFeatureModalComponent } from './access-manager-features/modals/create-feature-modal/create-feature-modal.component';
import { AccessManagerComponent } from './access-manager.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    AccessManagerComponent,
    AccessManagerApplicationsComponent,
    ApplicationDetailComponent,
    DeleteApplicationModalComponent,
    AccessManagerFeaturesComponent,
    FeatureDetailComponent,
    WebRoleFeatureUpdateModalComponent,
    DeleteFeatureModalComponent,
    CreateFeatureModalComponent,
    CreateApplicationModalComponent,
    WebRoleAppUpdateModalComponent,
    AccessManagerDeletedUsersComponent,
    DeletedUsersDetailComponent,
  ],
})
export class AccessManagerModule {}
