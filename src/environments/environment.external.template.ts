/**
 * Configuration for running local externally. This will run with local endpoints and
 * will require a local signed jwt token.
 *
 * @author Sam Butler
 * @since February 25, 2022
 */
export const environment = {
  tag: 'LOCAL-EXTERNAL',
  production: false,
  isLocal: true,
  apiUrl: '<IP_ADDRESS>:8000',
};
