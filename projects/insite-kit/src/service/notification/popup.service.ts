import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { NotificationPopupComponent } from '../../component/notification-popup/notification-popup.component';
import { Notification, NotificationType } from '../../model/notification.model';

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
      this.determineMessage(notification.bodyType),
      this.determineTitle(notification.bodyType),
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
    } else if (type === NotificationType.SYSTEM_UPDATE) {
      return 'Change to System Settings';
    } else {
      return 'New Notification';
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
    } else if (type === NotificationType.SYSTEM_UPDATE) {
      return 'There has been an update to system settings';
    } else {
      return 'There is a new notification in your inbox';
    }
  }
}
