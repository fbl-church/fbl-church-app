import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { JuniorChurchCheckInComponent } from './junior-church-check-in.component';

describe('JuniorChurchCheckInComponent', () => {
  let component: JuniorChurchCheckInComponent;
  let fixture: ComponentFixture<JuniorChurchCheckInComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(JuniorChurchCheckInComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
