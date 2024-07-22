import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-vbs-snacks-children-allergies',
  templateUrl: './vbs-snacks-children-allergies.component.html',
})
export class VBSSnacksChildrenAllergiesComponent implements OnInit, OnDestroy {
  dataloader: any;
  activeGroup: ChurchGroup;
  loading = true;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap((res) => (this.activeGroup = res.group)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.dataloader = (params) =>
          this.childrenService.get(
            params.set('churchGroup', [this.activeGroup]).set('allergiesAndAdditonalInfoOnly', ['true'])
          );
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onRowClick(event: any) {
    this.navigationService.navigate(`/children/${event.id}/details`);
  }

  onBackClick() {
    this.navigationService.navigate('/vbs/snacks');
  }
}
