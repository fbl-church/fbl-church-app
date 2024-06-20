import { Component } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';

@Component({
  selector: 'app-vbs-groups-primary',
  templateUrl: './vbs-groups-primary.component.html',
})
export class VBSGroupsPrimaryComponent {
  constructor(private readonly jwt: JwtService) {}
}
