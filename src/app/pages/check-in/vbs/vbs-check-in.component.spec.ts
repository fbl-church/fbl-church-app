import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { VBSCheckInComponent } from './vbs-check-in.component';

describe('VBSCheckInComponent', () => {
  let component: VBSCheckInComponent;
  let fixture: ComponentFixture<VBSCheckInComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(VBSCheckInComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
