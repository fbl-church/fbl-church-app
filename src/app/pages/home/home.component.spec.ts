import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'projects/insite-kit/src/service/auth-service/auth.service';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';
import { of } from 'rxjs';
import { FBAwanaTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let jwt: JwtService;
  let authService: AuthService;

  setupTests(async () => FBAwanaTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    jwt = TestBed.inject(JwtService);
    authService = TestBed.inject(AuthService);

    spyOn(jwt, 'get').and.returnValues('data', ['']);
    spyOn(authService, 'hasAccess').and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
