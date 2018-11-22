# CutLeaf Studios Website

This project is the source code backing the cutleafstudios.com website.

The goal is to exercise Angular, Firebase, and related libraries.

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build and Deploy

`ng build` creates build artifacts in the `dist/` directory. It will use environment configurations from the environments folder.

`firebase deploy` sends the build directory up to firebase hosting.

See https://firebase.googleblog.com/2016/07/deploy-to-multiple-environments-with.html for more information on how to configure the firebase profiles.
The aliases must be configured to 'staging' and 'production'.

#### Staging

Staging site: https://cutleaf-staging.firebaseapp.com

* `ng build --prod --configuration=staging`
* `firebase deploy -P staging`

#### Production

Production site: https://www.cutleafstudios.com

* `ng build --prod --configuration=prod`
* `firebase deploy -P production`
