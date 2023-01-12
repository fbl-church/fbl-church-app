export enum WebRole {
  EMPLOYEE = 1,
  CORPORATE_USER = 2,
  CUSTOMER_SERVICE_MANAGER = 3,
  ASSISTANT_MANAGER = 4,
  STORE_MANAGER = 5,
  DISTRICT_MANAGER = 6,
  REGIONAL = 7,
  SITE_ADMIN = 8,
  ADMIN = 9,
}

export enum VacationStatus {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
}

export enum App {
  USER = 'user',
  STORE = 'store',
  calendar = 'calendar',
  BLOCK_DATES = 'blockDates',
  MAP = 'map',
  REPORT = 'report',
  REGIONAL = 'regional',
  CONTACT = 'contact',
  GLOBAL = 'global',
}

export enum Access {
  CREATE = 'c',
  READ = 'r',
  UPDATE = 'u',
  DELETE = 'd',
}

export enum Feature {
  USER_DETAIL = 'detail',
  USER_VACATION = 'vacation',
  STORE_DETAIL = 'detail',
  BLOCK_DATES_OVERVIEW = 'overview',
  PROFILE = 'profile',
  NOTIFICATION = 'notification',
}
