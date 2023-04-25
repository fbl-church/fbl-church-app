import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBAwanaTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { GurdianComponent } from './gurdian.component';

describe('GurdianComponent', () => {
  let component: GurdianComponent;
  let fixture: ComponentFixture<GurdianComponent>;

  setupTests(async () => FBAwanaTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(GurdianComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
