import { Component } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly jwt: JwtService) {
    document.body.setAttribute('data-theme', this.jwt.getTheme());
  }
}
