// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dataResponseBack: [
    {
      id: 1,
      name: 'Juan',
      username: 'juanAdmin',
      password: '123456',
      role: 'admin',
      avatar: 'https://randomuser.me/api/portraits/men/80.jpg',
    },
    {
      id: 2,
      name: 'Pedro',
      username: 'pedroUser',
      password: '123456',
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
