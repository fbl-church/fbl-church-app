import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { HomeInroductionComponent } from './home-introduction.component';

describe('HomeInroductionComponent', () => {
  let component: HomeInroductionComponent;
  let fixture: ComponentFixture<HomeInroductionComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInroductionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
