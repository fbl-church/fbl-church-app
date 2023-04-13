export interface Notification {
  bodyType?: NotificationType;
  [x: string]: any;
}

export enum NotificationType {
  USER = 'USER',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE',
}

export enum NotificationAction {
  CREATE = 'C',
  READ = 'R',
  UPDATE = 'U',
  DELETE = 'D',
}
