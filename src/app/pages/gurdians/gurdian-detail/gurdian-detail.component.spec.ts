import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { GurdianDetailComponent } from './gurdian-detail.component';

describe('GurdianDetailComponent', () => {
  let component: GurdianDetailComponent;
  let fixture: ComponentFixture<GurdianDetailComponent>;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(GurdianDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
