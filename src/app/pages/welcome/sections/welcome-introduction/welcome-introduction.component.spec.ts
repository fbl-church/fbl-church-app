import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { WelcomeInroductionComponent } from './welcome-introduction.component';

describe('WelcomeInroductionComponent', () => {
  let component: WelcomeInroductionComponent;
  let fixture: ComponentFixture<WelcomeInroductionComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeInroductionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
