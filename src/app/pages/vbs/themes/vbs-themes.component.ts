import { Component } from '@angular/core';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';
@Component({
  selector: 'app-vbs-themes',
  templateUrl: './vbs-themes.component.html',
})
export class VBSThemesComponent {
  dataloader: any;

  constructor(private readonly vbsThemeService: VBSThemesService) {
    this.dataloader = (params: any) => this.vbsThemeService.get(params);
  }
}
