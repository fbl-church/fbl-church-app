import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { ContactOverviewComponent } from './contact-overview.component';

describe('ContactOverviewComponent', () => {
  let component: ContactOverviewComponent;
  let fixture: ComponentFixture<ContactOverviewComponent>;

  setupTests(async () => AppTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactOverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
