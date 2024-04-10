import { Injectable } from '@angular/core';
import { ThemeType } from '../../model/user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private readonly jwt: JwtService) { }

  setThemeToLoggedInUser() {
    if (this.jwt.isAuthenticated()) {
      this.setTheme(this.jwt.getTheme());
    }
  }

  setTheme(type: ThemeType) {
    if (type) {
      document.body.setAttribute('data-theme', type);
    }
  }
}
