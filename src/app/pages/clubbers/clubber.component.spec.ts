import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBAwanaTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { ClubberComponent } from './clubber.component';

describe('ClubberComponent', () => {
  let component: ClubberComponent;
  let fixture: ComponentFixture<ClubberComponent>;

  setupTests(async () => FBAwanaTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubberComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
