// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://argprog-backend-qqwa.onrender.com/api",
  TITLE_PATTERN: /^[\\w\\s\\p{Punct} a-zA-ZáéíóúüÁÉÍÓÚÜñÑ0-9\\-\\+\\?\\*]+$/,
  DESCRIPTION_PATTERN: /^[\\w\\s\\p{Punct} aA-zZáéíóúüÁÉÍÓÚÜñÑ0-9\\-\\+\\?\\*\\/\\.\\,]+$/,
  FIRSTNAME_PATTERN: /^([a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]{2,50})(([ a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]{2,50})){0,1}$/,
  LASTNAME_PATTERN: /^([a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]{2,50})(([ a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]{2,50})){0,1}$/,
  PASSWORD_PATTERN: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$/,
  EMAIL_PATTERN: /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  PHONE_NUMBER_PATTERN: /^\+(\d{1,3})\((\d{2,5})\)(\d{5,10})$/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
