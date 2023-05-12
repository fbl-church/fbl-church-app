import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { of } from 'rxjs';
import { FBAwanaTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { ClubberComponent } from './clubber.component';

describe('ClubberComponent', () => {
  let component: ClubberComponent;
  let fixture: ComponentFixture<ClubberComponent>;
  let authService: AuthService;

  setupTests(async () => FBAwanaTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubberComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    spyOn(authService, 'hasAccess').and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
