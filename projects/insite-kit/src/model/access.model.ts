import { App, FeatureType, WebRole } from './common.model';

export interface Application {
  id?: number;
  key?: App;
  displayName?: string;
  enabled?: boolean;
  [key: string]: any;
}

export interface Feature {
  id: number;
  app: App;
  feature: FeatureType;
  enabled: boolean;
  insertDate: Date | string;
  [key: string]: any;
}

export interface WebRoleFeature extends CRUD {
  webRole: WebRole;
  featureId: number;
  app: App;
  feature: FeatureType;
  [key: string]: any;
}

export interface WebRoleApp {
  webRole: WebRole;
  appId: number;
  access: boolean;
  [key: string]: any;
}

export interface CRUD {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
