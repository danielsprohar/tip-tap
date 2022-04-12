export const environment = {
  production: false,
  auth: {
    domain: 'dev-zdmnsdxi.us.auth0.com',
    clientId: 'mU2WIVp7LgQXkVh5qEN7B36SOeGKaUjV',
    audience: 'https://api.tiptap.academy',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: ['https://api.tiptap.academy'],
  },
  rwg: {
    defaults: {
      wordSize: 5,
      wordCount: 200,
    },
  },
  services: {
    book: {
      url: 'https://api.tiptap.academy/books',
    },
  },
}
