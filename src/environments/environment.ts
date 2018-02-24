// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA-P_6QrrNvRZq9pUdVNsOHJeMAMHeQc7Q',
    authDomain: 'cutleaf-staging.firebaseapp.com',
    databaseURL: 'https://cutleaf-staging.firebaseio.com',
    projectId: 'cutleaf-staging',
    storageBucket: 'cutleaf-staging.appspot.com',
    messagingSenderId: '67592791694'
  }
};
