import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { of } from 'rxjs';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { JuniorChurchWorkersComponent } from './junior-church-workers.component';

describe('JuniorChurchWorkersComponent', () => {
  let component: JuniorChurchWorkersComponent;
  let fixture: ComponentFixture<JuniorChurchWorkersComponent>;
  let authService: AuthService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(JuniorChurchWorkersComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    spyOn(authService, 'hasAccess').and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
