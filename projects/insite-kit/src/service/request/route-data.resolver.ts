import { FactoryProvider, Injectable, Injector, Type, ValueProvider } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  RouteDataResolverOptions,
  RouteDataResolverToken,
  defaultRouteDataResolverOptions,
} from '../../model/route-data.model';

/**
 * Loads data for a route before the page loads.
 *
 * @author Sam Butler
 * @since Dec 15, 2020
 */
@Injectable()
export class RouteDataResolver {
  static readonly resolvers = [];

  /**
   * Gets a resolver for a service. It defines a class in a closure so the class can be bound
   * to the service type and parameters.
   * @param serviceToken The token for the service used for the lookup.
   * @param options The set of options used to customize the method call.
   */
  static for(
    serviceToken: Type<any>,
    options: RouteDataResolverOptions = defaultRouteDataResolverOptions
  ): ValueProvider {
    const resolverToken: RouteDataResolverToken<typeof serviceToken> = {
      service: serviceToken,
      options: { ...defaultRouteDataResolverOptions, ...options },
    };

    const resolverService: ValueProvider = {
      provide: resolverToken,
      useValue: resolverToken,
    };

    const resolverFactory: FactoryProvider = {
      provide: resolverService,
      deps: [Injector, resolverToken],
      useFactory: (injector: Injector, serviceResolver: RouteDataResolverToken<any>) => {
        return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
          // Get all of the parameters from the route that are specified in the options
          const routeParams = serviceResolver.options.routeParams
            .map((param) => route.paramMap.get(param))
            .filter((param) => !!param);

          // Only execute method if the parameters specified in the options are in the route
          const isArgCountCorrect = serviceResolver.options.routeParams.length === routeParams.length;

          if (isArgCountCorrect) {
            const service = injector.get(serviceResolver.service);
            const method = service[serviceResolver.options.method];
            return method.apply(service, routeParams);
          }

          return of(serviceResolver.options.defaultResponse);
        };
      },
    };

    RouteDataResolver.resolvers.push(resolverService, resolverFactory);

    return resolverService;
  }
}
