import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { AwanaNavbarComponent } from './awana-navbar.component';

describe('AwanaNavbarComponent', () => {
  let component: AwanaNavbarComponent;
  let fixture: ComponentFixture<AwanaNavbarComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(AwanaNavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
