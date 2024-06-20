import { Component } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';

@Component({
  selector: 'app-vbs-groups-pre-primary',
  templateUrl: './vbs-groups-pre-primary.component.html',
})
export class VBSGroupsPrePrimaryComponent {
  constructor(private readonly jwt: JwtService) {}
}
