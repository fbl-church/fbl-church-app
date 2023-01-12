export interface Notification {
  id: number;
  type: NotificationType;
  read: boolean;
  receiverId: number;
  linkId: number;
  insertDate: Date;
}

export enum NotificationType {
  USER = 'USER',
  VACATION = 'VACATION',
  REQUEST_TRACKER = 'REQUEST_TRACKER',
}
