import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent {
  dataloader: any;

  addCirlce = faCirclePlus;

  constructor(private childrenService: ChildrenService, private readonly router: Router) {
    this.dataloader = (params: any) =>
      this.getJuniorChurchWorkersDataloader(params);
  }

  getJuniorChurchWorkersDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(
      params.set('churchGroup', ['JUNIOR_CHURCH'])
    );
  }

  onNewAttendanceRecord() {
    this.router.navigate(['/junior-church/new-record']);
  }
}
