import { Pipe, PipeTransform } from '@angular/core';
import {
  Notification,
  NotificationType,
} from '../../models/notification.model';

@Pipe({ name: 'formatNotitication' })
export class NotificationMessagePipe implements PipeTransform {
  transform(notification: Notification) {
    if (notification) {
      return this.determineMessage(notification.type);
    } else {
      return 'New Request';
    }
  }

  determineMessage(type: NotificationType) {
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
}
