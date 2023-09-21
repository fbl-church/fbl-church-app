import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { DeleteChildModalComponent } from './child-detail/modals/delete-child-modal/delete-child-modal.component';
import { EditChildGuardiansComponent } from './child-detail/pages/edit-child-guardians/edit-child-gurdians.component';
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
    DeleteChildModalComponent,
    EditChildComponent,
    EditChildGuardiansComponent,
  ],
})
export class ChildrenModule {}
