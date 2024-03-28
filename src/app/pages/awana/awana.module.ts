import { NgModule } from '@angular/core';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AwanaAttendanceDetailComponent } from './awana-check-in/awana-attendance-detail/awana-attendance-detail.component';
import { AwanaUpdateChildAttendanceModalComponent } from './awana-check-in/awana-attendance-detail/modals/update-child-attendance-modal/update-child-attendance-modal.component';
import { AwanaCheckInComponent } from './awana-check-in/awana-check-in.component';
import { AwanaNewAttendanceRecordComponent } from './awana-check-in/awana-new-attendance-record/awana-new-attendance-record.component';
import { AwanaChildrenDetailComponent } from './awana-children/awana-children-detail/awana-children-detail.component';
import { AwanaChildrenComponent } from './awana-children/awana-children.component';
import { AwanaGrandPrixComponent } from './awana-grand-prix/awana-grand-prix.component';
import { GrandPrixBracketComponent } from './awana-grand-prix/tournament/bracket/grand-prix-bracket.component';
import { GrandPrixTournamentComponent } from './awana-grand-prix/tournament/grand-prix-tournament.component';
import { GrandPrixMatchComponent } from './awana-grand-prix/tournament/match/grand-prix-match.component';
import { GrandPrixRoundComponent } from './awana-grand-prix/tournament/round/grand-prix-round.component';
import { AwanaWorkersComponent } from './awana-workers/awana-workers.component';

@NgModule({
  imports: [BaseInitModule, SharedModule],
  declarations: [
    AwanaWorkersComponent,
    AwanaChildrenComponent,
    AwanaChildrenDetailComponent,
    AwanaCheckInComponent,
    AwanaNewAttendanceRecordComponent,
    AwanaAttendanceDetailComponent,
    AwanaGrandPrixComponent,
    GrandPrixTournamentComponent,
    GrandPrixBracketComponent,
    GrandPrixMatchComponent,
    GrandPrixRoundComponent,
    AwanaUpdateChildAttendanceModalComponent,
  ],
})
export class AwanaModule {}
