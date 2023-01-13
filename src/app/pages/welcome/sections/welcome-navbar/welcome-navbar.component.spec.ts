import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { WelcomeNavbarComponent } from './welcome-navbar.component';

describe('WelcomeNavbarComponent', () => {
  let component: WelcomeNavbarComponent;
  let fixture: ComponentFixture<WelcomeNavbarComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeNavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
