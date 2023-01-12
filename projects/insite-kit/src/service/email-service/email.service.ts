import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { RequestService } from '../request-service/request.service';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly BASE_STORE_PATH = 'api/mail-app/email';

  constructor(private request: RequestService) {}

  /**
   * Authenticate a user and get a token for the user
   *
   * @param email The message to be sent
   * @returns Who the email was sent too.
   */
  sendContactAdminEmail(email: string): Observable<User[]> {
    return this.request.post<User[]>(`${this.BASE_STORE_PATH}/contact`, email);
  }
}
