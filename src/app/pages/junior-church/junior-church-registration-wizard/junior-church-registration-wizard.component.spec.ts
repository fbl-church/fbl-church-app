import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { JuniorChurchRegistrationWizardComponent } from './junior-church-registration-wizard.component';

describe('JuniorChurchRegistrationWizardComponent', () => {
  let component: JuniorChurchRegistrationWizardComponent;
  let fixture: ComponentFixture<JuniorChurchRegistrationWizardComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(JuniorChurchRegistrationWizardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
