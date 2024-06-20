import { Component } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';

@Component({
  selector: 'app-vbs-groups-middler',
  templateUrl: './vbs-groups-middler.component.html',
})
export class VBSGroupsMiddlerComponent {
  constructor(private readonly jwt: JwtService) {}
}
