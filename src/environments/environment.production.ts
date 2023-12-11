/**
 * Configuration for running production. This will run with production endpoints and
 * will require a production signed jwt token.
 *
 * @author Sam Butler
 * @since February 25, 2022
 */
export const environment = {
  tag: 'PRODUCTION',
  production: true,
  isLocal: false,
  siteUrl: 'www.fbl-church.com',
  apiUrl: 'fbl-church-microservice-2f144dcd5275.herokuapp.com',
};
