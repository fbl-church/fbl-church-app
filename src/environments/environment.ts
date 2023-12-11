/**
 * Default configuration for running the application locally. This requires the
 * fbl-church-microservice to be running locally as well and requires a locally
 * signed jwt.
 *
 * @author Sam Butler
 * @since February 25, 2022
 */
export const environment = {
  tag: 'LOCAL',
  production: false,
  isLocal: true,
  siteUrl: 'localhost:4200',
  apiUrl: 'localhost:8000',
};
