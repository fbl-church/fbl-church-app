import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { NurseryCheckInComponent } from './nursery-check-in.component';

describe('NurseryCheckInComponent', () => {
  let component: NurseryCheckInComponent;
  let fixture: ComponentFixture<NurseryCheckInComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseryCheckInComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
