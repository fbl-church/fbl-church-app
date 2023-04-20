import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/service/users/user.service';
import { FBAwanaTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;

  setupTests(async () => FBAwanaTestBed.setup());

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    spyOn(userService, 'getCurrentUser').and.returnValue(
      of(new HttpResponse({}))
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
