import { AuthToken } from 'projects/insite-kit/src/model/auth-token.model';
import { WebRole } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';

class FBLChurchDataObject {
  getUser(): User[] {
    return [
      {
        firstName: 'Test',
        lastName: 'Admin',
        email: 'Test@Admin.com',
        webRole: WebRole.ADMINISTRATOR,
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

  getToken(): string {
    return 'eyJhbGciOiJIUzUxMiJ9.eyJ3ZWJSb2xlIjoiVVNFUiIsImZpcnN0TmFtZSI6IlRlc3QiLCJsYXN0TmFtZSI6IlVzZXIiLCJwYXNzd29yZFJlc2V0IjpmYWxzZSwiZW52IjoiTE9DQUwiLCJleHAiOjE2NTk1NjM5NDEsInVzZXJJZCI6NiwiaWF0IjoxNjU5NTQ1OTQxLCJlbWFpbCI6InRlc3RAdXNlci5jb20ifQ.LpzHXld-0KnFeZckcE3iFO8dk49kQMmZkXaY75GhcW3hbIsvy5-fwtfFHoCQGfoRfo7WatLGp15nWLi64c2vEA';
  }
}

export const TestData = new FBLChurchDataObject();
