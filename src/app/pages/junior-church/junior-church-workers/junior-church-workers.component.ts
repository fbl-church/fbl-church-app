import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Access,
  App,
  FeatureType,
  TranslationKey,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-junior-church-workers',
  templateUrl: './junior-church-workers.component.html',
})
export class JuniorChurchWorkersComponent implements OnInit {
  dataloader: any;
  form: FormGroup;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  WebRole = WebRole;

  emailButtonLoading = false;
  modalLoading = false;

  nonJuniorChurchWorkers: any[];

  workerTypes = [];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService
  ) {
    this.dataloader = (params: any) =>
      this.getJuniorChurchWorkersDataloader(params);
  }

  ngOnInit() {
    this.workerTypes = [
      {
        name: this.commonService.translate(
          WebRole.JUNIOR_CHURCH_SUPERVISOR,
          TranslationKey.WEB_ROLE
        ),
        value: WebRole.JUNIOR_CHURCH_SUPERVISOR,
      },
      {
        name: this.commonService.translate(
          WebRole.JUNIOR_CHURCH_WORKER,
          TranslationKey.WEB_ROLE
        ),
        value: WebRole.JUNIOR_CHURCH_WORKER,
      },
    ];
    this.buildForm();
    return this.userService
      .getUsers(
        new Map().set('notWebRole', [
          'JUNIOR_CHURCH_DIRECTOR',
          'JUNIOR_CHURCH_SUPERVISOR',
          'JUNIOR_CHURCH_WORKER',
        ])
      )
      .subscribe((res) => {
        this.nonJuniorChurchWorkers = res.body.map((u) => {
          return { name: this.commonService.getFormattedName(u), value: u.id };
        });
      });
  }

  onRowClick(user: any) {
    this.router.navigate([`/users/${user.id}/details`]);
  }

  buildForm() {
    this.form = this.fb.group({
      type: [this.workerTypes[1], Validators.required],
      workers: ['', [Validators.required]],
    });
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
    window.location.href = mailingContent.join('');
  }

  onAddWorkers() {
    this.modalLoading = true;
    console.log(this.form.value.type, this.form.value.workers);
  }
}
