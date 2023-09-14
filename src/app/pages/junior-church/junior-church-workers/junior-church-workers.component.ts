import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Access,
  App,
  Feature,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
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
  WebRole = WebRole;

  emailButtonLoading = false;

  constructor(
    private readonly userService: UserService,
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

  onSendMassEmail() {
    this.emailButtonLoading = true;
    this.getJuniorChurchWorkersDataloader(new Map()).subscribe((res) => {
      this.openMailProvider(res.body);
      this.emailButtonLoading = false;
    });
  }

  openMailProvider(users: User[]) {
    const mailingContent = [];
    mailingContent.push('mailto:');
    mailingContent.push(
      users.map((u) => u.email).filter((m) => m && m.trim().length > 0)
    );
    mailingContent.push('?subject=Junior Church Workers');
    window.open(mailingContent.join(''), '_blank');
  }

  onNewWorker() {}
}
