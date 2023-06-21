import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { AwanaCheckInComponent } from './awana-check-in.component';

describe('AwanaCheckInComponent', () => {
  let component: AwanaCheckInComponent;
  let fixture: ComponentFixture<AwanaCheckInComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(AwanaCheckInComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
