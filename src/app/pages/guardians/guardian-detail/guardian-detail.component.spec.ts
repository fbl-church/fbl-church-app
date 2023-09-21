import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { GuardianDetailComponent } from './guardian-detail.component';

describe('GuardianDetailComponent', () => {
  let component: GuardianDetailComponent;
  let fixture: ComponentFixture<GuardianDetailComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
