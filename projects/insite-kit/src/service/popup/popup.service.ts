import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { NotificationPopupComponent } from '../../components/notificaiton-popup/notification-popup.component';
import {
  Notification,
  NotificationType,
} from '../../models/notification.model';

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
    return this.toastService.show(
      this.determineMessage(notification.type),
      this.determineTitle(notification.type),
      {
        toastComponent: NotificationPopupComponent,
        timeOut: this.timeout,
        tapToDismiss: false,
        positionClass: 'toast-top-right',
        toastClass: 'toaster',
      }
    );
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

  /**
   * Gets the notification title based on the notification type.
   *
   * @param type The type of notification to display.
   * @returns String of the title to display.
   */
  private determineTitle(type: NotificationType) {
    if (type === NotificationType.USER) {
      return 'New User Request';
    } else if (type === NotificationType.VACATION) {
      return 'New Vacation Request';
    } else if (type === NotificationType.REQUEST_TRACKER) {
      return 'Vacation Status Update';
    } else {
      return 'New Request';
    }
  }

  /**
   * Gets the notification message based on the notification type.
   *
   * @param type The type of notification to display.
   * @returns String of the message to display.
   */
  private determineMessage(type: NotificationType) {
    if (type === NotificationType.USER) {
      return 'A new user has requested review.';
    } else if (type === NotificationType.VACATION) {
      return 'There is a new vacation request to review.';
    } else if (type === NotificationType.REQUEST_TRACKER) {
      return 'The status of your vacation has been updated!';
    } else {
      return 'There is a new notification in your inbox';
    }
  }
}
