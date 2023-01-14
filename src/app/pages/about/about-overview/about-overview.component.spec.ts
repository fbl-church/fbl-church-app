import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { AboutOverviewComponent } from './about-overview.component';

describe('AboutOverviewComponent', () => {
  let component: AboutOverviewComponent;
  let fixture: ComponentFixture<AboutOverviewComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
