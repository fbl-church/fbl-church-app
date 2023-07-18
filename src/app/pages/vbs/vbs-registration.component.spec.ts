import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { VBSRegistrationComponent } from './vbs-registration.component';

describe('VBSRegistrationComponent', () => {
  let component: VBSRegistrationComponent;
  let fixture: ComponentFixture<VBSRegistrationComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(VBSRegistrationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
