import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { NotificationService } from '../../notification/notification.service';
import { PopupService } from '../../popup/popup.service';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'ik-general-notification',
  template: ``,
})
export class GeneralNotificationComponent implements OnInit, OnDestroy {
  private readonly GENERAL_SOCKET_URL = '/topic/general/notification';
  destroy = new Subject<void>();

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly notificationService: NotificationService,
    private readonly popupService: PopupService
  ) {}

  ngOnDestroy() {
    this.destroy.next();
  }

  ngOnInit() {
    this.subscriptionService.init();
    return this.subscriptionService
      .listen(this.GENERAL_SOCKET_URL)
      .pipe(
        tap((res) => this.popupService.showNotification(res)),
        tap(() => this.notificationService.triggerNotificationUpdate()),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
