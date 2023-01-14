import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { LoginOverviewComponent } from './login-overview.component';

describe('LoginOverviewComponent', () => {
  let component: LoginOverviewComponent;
  let fixture: ComponentFixture<LoginOverviewComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
