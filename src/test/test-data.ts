import { AuthToken, User, WebRole } from 'insite-kit';

class FBAwanaDataObject {
  getUser(): User[] {
    return [
      {
        firstName: 'Test',
        lastName: 'Admin',
        email: 'Test@Admin.com',
        webRole: WebRole.ADMIN,
      },
      {
        firstName: 'Test',
        lastName: 'User',
        email: 'Test@User.com',
        webRole: WebRole.USER,
      },
    ];
  }

  getAuthToken(): AuthToken {
    return {
      token: 'fakeToken',
      createDate: '2022-07-29T17:27:26',
      expireDate: '2022-07-29T22:27:26',
      user: this.getUser()[0],
    };
  }
}

export const TestData = new FBAwanaDataObject();
