import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly BASE_PATH = 'api/mail';

  constructor(private request: RequestService) {}

  /**
   * Contact the admin user with the given message
   *
   * @param message The message to be sent
   * @returns Who the email was sent too.
   */
  sendContactAdminEmail(message: string): Observable<User[]> {
    return this.request.post<User[]>(`${this.BASE_PATH}/contact`, message);
  }

  /**
   * Will send a forgot password email
   *
   * @param email The email to send the forgot password too
   * @returns Who the email was sent too.
   */
  sendForgotPasswordEmail(email: string): Observable<User[]> {
    return this.request.post<User[]>(`${this.BASE_PATH}/forgot-password`, email);
  }
}
