import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { RegistrationOverviewComponent } from './registration-overview.component';

describe('RegistrationOverviewComponent', () => {
  let component: RegistrationOverviewComponent;
  let fixture: ComponentFixture<RegistrationOverviewComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
