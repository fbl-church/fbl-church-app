import { Type } from '@angular/core';

export interface RouteDataResolverOptions {
  method?: string;
  routeParams?: string[];
  defaultResponse?: any;
}

export const defaultRouteDataResolverOptions: RouteDataResolverOptions = {
  method: 'getById',
  routeParams: ['id'],
  defaultResponse: {},
};

export interface RouteDataResolverToken<T> {
  service: Type<T>;
  options: RouteDataResolverOptions;
}
