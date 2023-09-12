import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
} from 'projects/insite-kit/src/model/common.model';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-junior-church-workers',
  templateUrl: './junior-church-workers.component.html',
})
export class JuniorChurchWorkersComponent {
  dataloader: any;

  Feature = Feature;
  Application = App;
  Access = Access;

  constructor(
    private userService: UserService,
    private readonly router: Router
  ) {
    this.dataloader = (params: any) =>
      this.getJuniorChurchWorkersDataloader(params);
  }

  onRowClick(user: any) {
    this.router.navigate([`/users/${user.id}/details`]);
  }

  getJuniorChurchWorkersDataloader(params?: Map<string, string[]>) {
    return this.userService.getUsers(
      params.set('webRole', [
        'JUNIOR_CHURCH_DIRECTOR',
        'JUNIOR_CHURCH_SUPERVISOR',
        'JUNIOR_CHURCH_WORKER',
      ])
    );
  }

  onNewWorker() {}
}
