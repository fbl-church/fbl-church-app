import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request-service/request.service';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly BASE_PATH = 'api/notification-app/notifications';
  private notificationListener = new Subject<void>();

  constructor(private readonly requestService: RequestService) {}

  /**
   * Get a list of notifications for the given request
   *
   * @param params to filter request on
   * @returns observable of the returned request
   */
  getNotifications(
    params?: Map<string, string[]>
  ): Observable<HttpResponse<Notification[]>> {
    return this.requestService.get<Notification[]>(this.BASE_PATH, params);
  }

  /**
   * This will get the notification for the given id.
   *
   * @param id The id of the notificaiton to get.
   * @returns Notification observable
   */
  getNotificationById(id: number): Observable<HttpResponse<Notification>> {
    return this.requestService.get<Notification>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * This will mark the notification as read for the given id.
   *
   * @param id The id of the notitificaiton to read.
   * @returns Notification object that was read.
   */
  markNotificationRead(id: number): Observable<Notification> {
    return this.requestService.put<Notification>(
      `${this.BASE_PATH}/${id}/read`
    );
  }

  /**
   * This will delete the notification for the given id.
   *
   * @param id The notification id that needs deleted.
   * @returns Any object that is has completed.
   */
  deleteNotification(id: number): Observable<any> {
    return this.requestService.delete<any>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * Watch for changes to the notifications trigger.
   *
   * @returns observeable with the change detected.
   */
  notificationChange() {
    return this.notificationListener.asObservable();
  }

  /**
   * Trigger an update for the notifications in the navbar
   */
  triggerNotificationUpdate() {
    this.notificationListener.next();
  }
}
