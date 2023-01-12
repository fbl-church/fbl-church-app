import { Component } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { NOTIFICATION_ANIMATION } from './notification-popup.animation';

@Component({
  selector: '[ik-custom-toast-component]',
  templateUrl: `notification-popup.component.html`,
  animations: [NOTIFICATION_ANIMATION],
  preserveWhitespaces: false,
})
export class NotificationPopupComponent extends Toast {
  notificationBellIcon = faBell;

  constructor(tService: ToastrService, tPackage: ToastPackage) {
    super(tService, tPackage);
  }

  /**
   * Trigger the notification action of the popup.
   *
   * @param event The event to trigger.
   * @returns Returns the status of the action.
   */
  action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }
}
