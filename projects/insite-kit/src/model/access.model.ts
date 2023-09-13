import { App } from './common.model';

export interface Application {
  id: number;
  name: App;
  enabled: boolean;
  [key: string]: any;
}
