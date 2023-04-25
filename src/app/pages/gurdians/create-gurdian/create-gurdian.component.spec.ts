import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { FBAwanaTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { CreateGurdianComponent } from './create-gurdian.component';

describe('CreateGurdianComponent', () => {
  let component: CreateGurdianComponent;
  let fixture: ComponentFixture<CreateGurdianComponent>;
  let jwt: JwtService;

  setupTests(async () => FBAwanaTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGurdianComponent);
    component = fixture.componentInstance;
    jwt = TestBed.inject(JwtService);

    spyOn(jwt, 'get').and.returnValue(WebRole.ADMIN);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
