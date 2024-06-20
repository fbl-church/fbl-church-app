import { Component } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';

@Component({
  selector: 'app-vbs-groups-junior',
  templateUrl: './vbs-groups-junior.component.html',
})
export class VBSGroupsJuniorComponent {
  constructor(private readonly jwt: JwtService) {}
}
