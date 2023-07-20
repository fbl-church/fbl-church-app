import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChildAdditionalInfoCardCardComponent } from './child-detail/cards/child-additional-info-card/child-additional-info-card.component';
import { ChildDetailsCardComponent } from './child-detail/cards/child-details-card/child-details-card.component';
import { ChildGroupDetailsGridComponent } from './child-detail/cards/child-group-details-grid/child-group-details-grid.component';
import { ChildGurdiansDetailsGridComponent } from './child-detail/cards/child-gurdians-details-grid/child-gurdians-details-grid.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { DeleteChildModalComponent } from './child-detail/modals/delete-child-modal/delete-child-modal.component';
import { EditChildGroupsComponent } from './child-detail/pages/edit-child-groups/edit-child-groups.component';
import { EditChildGurdiansComponent } from './child-detail/pages/edit-child-gurdians/edit-child-gurdians.component';
import { EditChildComponent } from './child-detail/pages/edit-child/edit-child.component';
import { ChildrenComponent } from './children.component';
import { CreateChildComponent } from './create-child/create-child.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    ChildrenComponent,
    EditChildComponent,
    CreateChildComponent,
    ChildDetailComponent,
    ChildDetailsCardComponent,
    ChildGurdiansDetailsGridComponent,
    DeleteChildModalComponent,
    ChildAdditionalInfoCardCardComponent,
    EditChildComponent,
    EditChildGurdiansComponent,
    ChildGroupDetailsGridComponent,
    EditChildGroupsComponent,
  ],
})
export class ChildrenModule {}
