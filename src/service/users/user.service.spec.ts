import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PasswordUpdate } from 'projects/insite-kit/src/model/password-update.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { of } from 'rxjs';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let requestService: RequestService;
  let jwt: JwtService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    service = TestBed.inject(UserService);
    requestService = TestBed.inject(RequestService);
    jwt = TestBed.inject(JwtService);

    spyOn(requestService, 'get').and.returnValue(of(new HttpResponse({})));
    spyOn(requestService, 'post');
    spyOn(requestService, 'put');
    spyOn(requestService, 'delete');
    spyOn(jwt, 'getUserId').and.returnValue(1);
  });

  it('should call get users endpoint', () => {
    const userMap = new Map().set('userId', 1);
    service.getUsers(userMap);

    expect(requestService.get).toHaveBeenCalledWith('api/users', userMap);
  });

  it('should call get current user endpoint', () => {
    service.getCurrentUser();
    expect(requestService.get).toHaveBeenCalledWith('api/users/1');
  });

  it('should call get user by id endpoint', () => {
    service.getUserById(1);
    expect(requestService.get).toHaveBeenCalledWith('api/users/1');
  });

  it('should call to check if email exist', () => {
    service.doesEmailExist('fake@mail.com');
    expect(requestService.get).toHaveBeenCalledWith('api/users/check-email?email=fake@mail.com');
  });

  it('should call endpoint to create new user', () => {
    const newUser: User = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'Test@mail.com',
      password: 'testPassword',
    };

    service.createUser(newUser);
    expect(requestService.post).toHaveBeenCalledWith('api/users/create', newUser);
  });

  it('should call endpoint to register a new user', () => {
    const newUser: User = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'Test@mail.com',
      password: 'testPassword',
    };

    service.register(newUser);
    expect(requestService.post).toHaveBeenCalledWith('api/users/register', newUser);
  });

  it('should call endpoint to update user', () => {
    const updatedUser: User = {
      firstName: 'NewFirstName',
    };

    service.updateUserProfile(updatedUser);
    expect(requestService.put).toHaveBeenCalledWith('api/users', updatedUser);
  });

  it('should call endpoint to update user by id', () => {
    const updatedUser: User = {
      firstName: 'NewFirstName',
    };

    service.updateUserProfileById(12, updatedUser);
    expect(requestService.put).toHaveBeenCalledWith('api/users/12', updatedUser);
  });

  it('should call endpoint to update user password', () => {
    const newPass: PasswordUpdate = {
      currentPassword: 'current',
      newPassword: 'new',
    };

    service.updateUserPassword(newPass);
    expect(requestService.put).toHaveBeenCalledWith('api/users/credentials/password', newPass);
  });

  it('should call endpoint to update user password by id', () => {
    const newPass: PasswordUpdate = {
      currentPassword: 'current',
      newPassword: 'new',
    };

    service.updateUserPasswordById(1, newPass);
    expect(requestService.put).toHaveBeenCalledWith('api/users/credentials/password/1', newPass);
  });

  it('should call endpoint to reset user password', () => {
    const newPass: PasswordUpdate = { newPassword: 'new' };

    service.resetUserPassword(newPass);
    expect(requestService.put).toHaveBeenCalledWith('api/users/credentials/password/reset', newPass);
  });

  it('should delete user', () => {
    service.delete(10);
    expect(requestService.delete).toHaveBeenCalledWith('api/users/10');
  });
});
