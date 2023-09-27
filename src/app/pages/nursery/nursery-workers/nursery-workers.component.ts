import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import {
  Access,
  App,
  FeatureType,
  TranslationKey,
  WebRole,
} from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { UserService } from 'src/service/users/user.service';

@Component({
  selector: 'app-nursery-workers',
  templateUrl: './nursery-workers.component.html',
})
export class NurseryWorkersComponent implements OnInit {
  @ViewChild('addWorkersModal') workersModal: ModalComponent;
  @ViewChild(GridComponent) grid: GridComponent;

  dataloader: any;
  form: FormGroup;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;
  WebRole = WebRole;

  emailButtonLoading = false;
  modalLoading = false;

  nonNurseryWorkers: any[];

  workerTypes = [];

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService
  ) {
    this.dataloader = (params: any) => this.getNurseryWorkersDataloader(params);
  }

  ngOnInit() {
    this.workerTypes = [
      {
        name: this.commonService.translate(
          WebRole.NURSERY_SUPERVISOR,
          TranslationKey.WEB_ROLE
        ),
        value: WebRole.NURSERY_SUPERVISOR,
      },
      {
        name: this.commonService.translate(
          WebRole.NURSERY_WORKER,
          TranslationKey.WEB_ROLE
        ),
        value: WebRole.NURSERY_WORKER,
      },
    ];
    this.buildForm();
    return this.userService
      .getUsers(
        new Map().set('notWebRole', [
          'NURSERY_DIRECTOR',
          'NURSERY_SUPERVISOR',
          'NURSERY_WORKER',
        ])
      )
      .subscribe((res) => {
        this.nonNurseryWorkers = res.body.map((u) => {
          return { name: this.commonService.getFormattedName(u), value: u.id };
        });
      });
  }

  buildForm() {
    this.form = this.fb.group({
      type: [this.workerTypes[1], Validators.required],
      workers: ['', [Validators.required]],
    });
  }

  getNurseryWorkersDataloader(params?: Map<string, string[]>) {
    return this.userService.getUsers(
      params.set('webRole', [
        'NURSERY_DIRECTOR',
        'NURSERY_SUPERVISOR',
        'NURSERY_WORKER',
      ])
    );
  }

  onSendMassEmail() {
    this.emailButtonLoading = true;
    this.getNurseryWorkersDataloader(new Map()).subscribe((res) => {
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
    mailingContent.push('?subject=Nursery Workers');
    window.location.href = mailingContent.join('');
  }

  openWorkerModal() {
    this.form.controls.workers.reset();
    this.workersModal.open();
  }

  onAddWorkers() {
    this.modalLoading = true;
    this.userService
      .addRoleToUsers(this.form.value.type.value, this.form.value.workers)
      .subscribe({
        next: (res) => {
          this.workersModal.close();
          this.modalLoading = false;
          this.grid.refresh();
          this.popupService.success(
            'Users Successfully added to Nursery Workers!'
          );
        },
        error: () => {
          this.popupService.error(
            'Unable to add workers at this time. Try again later.'
          );
          this.modalLoading = false;
        },
      });
  }
}
