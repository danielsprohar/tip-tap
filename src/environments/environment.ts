// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import authConfig from '../../auth_config.json'
const resourceServerUrl = 'http://localhost:3000'

export const environment = {
  production: false,
  auth: {
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    audience: authConfig.audience,
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: ['http://localhost:3000/*', `${authConfig.audience}/*`],
  },
  rwg: {
    defaults: {
      wordSize: 5,
      wordCount: 200,
    },
  },
  services: {
    book: {
      url: `${resourceServerUrl}/books`,
    },
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
