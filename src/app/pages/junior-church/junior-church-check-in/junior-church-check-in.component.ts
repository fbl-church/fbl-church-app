import { Component } from '@angular/core';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-junior-church-check-in',
  templateUrl: './junior-church-check-in.component.html',
})
export class JuniorChurchCheckInComponent {
  dataloader: any;

  constructor(private childrenService: ChildrenService) {
    this.dataloader = (params: any) =>
      this.getJuniorChurchWorkersDataloader(params);
  }

  getJuniorChurchWorkersDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(
      params.set('churchGroup', ['JUNIOR_CHURCH'])
    );
  }
}
