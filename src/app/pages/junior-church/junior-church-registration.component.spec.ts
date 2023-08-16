import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { JuniorChurchRegistrationComponent } from './junior-church-registration.component';

describe('JuniorChurchRegistrationComponent', () => {
  let component: JuniorChurchRegistrationComponent;
  let fixture: ComponentFixture<JuniorChurchRegistrationComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(JuniorChurchRegistrationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
