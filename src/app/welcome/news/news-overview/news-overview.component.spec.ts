import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { NewsOverviewComponent } from './news-overview.component';

describe('NewsOverviewComponent', () => {
  let component: NewsOverviewComponent;
  let fixture: ComponentFixture<NewsOverviewComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsOverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
