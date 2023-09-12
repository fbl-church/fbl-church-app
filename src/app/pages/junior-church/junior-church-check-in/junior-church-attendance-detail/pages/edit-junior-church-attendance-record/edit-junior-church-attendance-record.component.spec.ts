import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'projects/insite-kit/src/service/auth/auth.service';
import { of } from 'rxjs';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { EditJuniorChurchRecordComponent } from './edit-junior-church-attendance-record.component';

describe('EditJuniorChurchRecordComponent', () => {
  let component: EditJuniorChurchRecordComponent;
  let fixture: ComponentFixture<EditJuniorChurchRecordComponent>;
  let authService: AuthService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJuniorChurchRecordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    component.record = { name: 'test' };

    spyOn(authService, 'hasAccess').and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
