import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { ThemeService } from 'projects/insite-kit/src/service/auth/theme.service';
import { Subject, takeUntil } from 'rxjs';
import { SplashScreenService } from './shared/components/layouts/splash-screen-layout/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  pageLoading = false;
  destroy = new Subject<void>();

  constructor(
    private readonly themeService: ThemeService,
    private readonly jwt: JwtService,
    private readonly splashScreenService: SplashScreenService
  ) {
    this.themeService.setThemeToLoggedInUser();
  }

  ngOnInit() {
    this.splashScreenService
      .listen()
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => (this.pageLoading = this.jwt.isAuthenticated() ? res : this.pageLoading));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
