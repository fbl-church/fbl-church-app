import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { NotificationPopupComponent } from '../../components/notificaiton-popup/notification-popup.component';
import { Notification } from '../../models/notification.model';

/**
 * Service for showing notifications in the application. It will add the component to
 * the specified container that is passed in.
 *
 * @author Sam Butler
 * @since August 11, 2022
 */
@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private readonly timeout = 4000;

  constructor(private readonly toastService: ToastrService) {}

  /**
   * Shows the given notification in the container.
   *
   * @param notification The notification to display.
   * @return It will return that active toast message that was shown.
   */
  showNotification(notification: Notification): ActiveToast<any> {
    return this.toastService.show('New Message', 'Notification', {
      toastComponent: NotificationPopupComponent,
      timeOut: this.timeout,
      tapToDismiss: false,
      positionClass: 'toast-top-right',
      toastClass: 'toaster',
    });
  }

  /**
   * Shows a SUCCESS toast message with the given message and
   * title of the popup.
   *
   * @param message The message to display.
   * @param title The title of the popup.
   * @returns The active toast message object.
   */
  success(message: string, title?: string): ActiveToast<any> {
    return this.toastService.success(message, title);
  }

  /**
   * Shows a WARNING toast message with the given message and
   * title of the popup.
   *
   * @param message The message to display.
   * @param title The title of the popup.
   * @returns The active toast message object.
   */
  warning(message: string, title?: string): ActiveToast<any> {
    return this.toastService.warning(message, title);
  }

  /**
   * Shows a ERROR toast message with the given message and
   * title of the popup.
   *
   * @param message The message to display.
   * @param title The title of the popup.
   * @returns The active toast message object.
   */
  error(message: string, title?: string): ActiveToast<any> {
    return this.toastService.error(message, title);
  }

  /**
   * Shows a INFO toast message with the given message and
   * title of the popup.
   *
   * @param message The message to display.
   * @param title The title of the popup.
   * @returns The active toast message object.
   */
  info(message: string, title?: string): ActiveToast<any> {
    return this.toastService.info(message, title);
  }
}
