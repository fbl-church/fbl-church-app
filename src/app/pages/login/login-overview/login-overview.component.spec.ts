import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { of, throwError } from 'rxjs';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { TestDOM } from 'src/test/test-dom';
import { setupTests } from 'src/test/test-setup';
import { LoginOverviewComponent } from './login-overview.component';

describe('LoginOverviewComponent', () => {
  let component: LoginOverviewComponent;
  let fixture: ComponentFixture<LoginOverviewComponent>;
  let authService;
  let navigationService;
  let popupService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOverviewComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    navigationService = TestBed.inject(NavigationService);
    popupService = TestBed.inject(PopupService);

    spyOn(authService, 'authenticate').and.returnValue(of(null));

    spyOn(navigationService, 'navigate');
    spyOn(popupService, 'error');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should build form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.value.username).toEqual('');
    expect(component.form.value.password).toEqual('');
  });

  it('should login successfully when login button is clicked', () => {
    TestDOM.updateForm('#loginForm', {
      username: 'test@mail.com',
      password: 'testPassword',
    });

    fixture.detectChanges();
    TestDOM.click('#loginButton');

    expect(authService.authenticate).toHaveBeenCalledWith('test@mail.com', 'testPassword');
    expect(navigationService.navigate).toHaveBeenCalledWith('/profile');
    expect(popupService.error).not.toHaveBeenCalled();
  });

  it('should not be able to login and show error message', () => {
    authService.authenticate.and.returnValue(throwError(() => of('Invalid')));
    TestDOM.updateForm('#loginForm', {
      username: 'test@mail.com',
      password: 'testPassword',
    });
    fixture.detectChanges();

    TestDOM.click('#loginButton');

    expect(authService.authenticate).toHaveBeenCalledWith('test@mail.com', 'testPassword');
    expect(navigationService.navigate).not.toHaveBeenCalled();
    expect(popupService.error).toHaveBeenCalledWith('Invalid email or password!');
    expect(component.loading).toBeFalsy();
  });
});
