import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SMSMessageService {
  readonly BASE_VBS_PATH = 'api/sms';

  constructor(private readonly request: RequestService) {}

  /**
   * Send Verification Code
   *
   * @param phone The phone number to send the verification code to
   */
  public sendVerificationCode(phone: any): Observable<any> {
    return this.request.post<any>(`${this.BASE_VBS_PATH}/send-verification`, { phone: phone });
  }

  /**
   * Verify Code
   *
   * @param phone The phone number to verify
   * @param code The verification code
   */
  public verifyCode(phone: any, code: any): Observable<any> {
    return this.request.post<any>(`${this.BASE_VBS_PATH}/verify`, { phone: phone, code: code });
  }
}
