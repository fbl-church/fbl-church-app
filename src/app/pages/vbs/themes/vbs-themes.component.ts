import { Component } from '@angular/core';
import { VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';
@Component({
  selector: 'app-vbs-themes',
  templateUrl: './vbs-themes.component.html',
})
export class VBSThemesComponent {
  dataloader: any;

  constructor(
    private readonly vbsThemeService: VBSThemesService,
    private readonly navigationService: NavigationService
  ) {
    this.dataloader = (params: any) => this.vbsThemeService.get(params);
  }

  onNewThemeClick() {
    this.navigationService.navigate('/vbs/themes/new');
  }

  onRowClick(event: VBSTheme) {
    this.navigationService.navigate(`/vbs/themes/${event.id}`);
  }
}
