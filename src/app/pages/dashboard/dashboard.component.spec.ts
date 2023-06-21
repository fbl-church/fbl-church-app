import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let jwtService: JwtService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    jwtService = TestBed.inject(JwtService);

    spyOn(jwtService, 'get').and.returnValue('testName');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
