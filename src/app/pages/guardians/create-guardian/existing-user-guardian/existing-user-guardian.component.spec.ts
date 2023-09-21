import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { ExistingUserGuardianComponent } from './existing-user-guardian.component';

describe('ExistingUserGuardianComponent', () => {
  let component: ExistingUserGuardianComponent;
  let fixture: ComponentFixture<ExistingUserGuardianComponent>;
  let jwt: JwtService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingUserGuardianComponent);
    component = fixture.componentInstance;
    jwt = TestBed.inject(JwtService);

    spyOn(jwt, 'get').and.returnValue(WebRole.ADMINISTRATOR);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
