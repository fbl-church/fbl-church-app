import { AuthToken } from 'projects/insite-kit/src/models/auth-token.model';
import { WebRole } from 'projects/insite-kit/src/models/common.model';
import { User } from 'projects/insite-kit/src/models/user.model';

class HydroDataObject {
  getUser(): User[] {
    return [
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

export const TestData = new HydroDataObject();
