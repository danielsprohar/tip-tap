import authConfig from '../../auth_config.json'

const resourceServerUrl = authConfig.audience

export const environment = {
  production: false,
  auth: {
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    audience: authConfig.audience,
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: [`${resourceServerUrl}/*`],
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
