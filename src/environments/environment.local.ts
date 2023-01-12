/**
 * Configuration for testing locally. This requires the marcs-microservice to be
 * running locally as well and requires a locally signed jwt.
 *
 * @author Sam Butler
 * @since February 25, 2022
 */
export const environment = {
  production: false,
  isLocal: true,
  apiUrl: 'localhost:8080',
};
