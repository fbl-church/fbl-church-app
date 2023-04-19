/**
 * Configuration for testing locally. This requires the fb-awana-microservice to be
 * running locally as well and requires a locally signed jwt.
 *
 * @author Sam Butler
 * @since February 25, 2022
 */
export const environment = {
  tag: 'LOCAL',
  production: false,
  isLocal: true,
  apiUrl: 'localhost:8000',
};
