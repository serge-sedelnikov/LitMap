var gulp = require('gulp');
var bundle = require('aurelia-bundler').bundle;

var config = {
  force: true,
  baseURL: '.',                   // baseURL of the application
  configPath: './config.js',      // config.js file. Must be within `baseURL`
  bundles: {
    "src/dist/app-build": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
      includes: [
        '[*.js]',
        '*.html!text',
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    // "src/dist/app-build-components": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
    //   includes: [
    //     '[components/*.js]',
    //     'components/*.html!text',
    //   ],
    //   options: {
    //     inject: true,
    //     minify: true
    //   }
    // },
    // "src/dist/app-build-elements": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
    //   includes: [
    //     '[elements/*.js]',
    //     'elements/*.html!text',
    //   ],
    //   options: {
    //     inject: true,
    //     minify: true
    //   }
    // },
    "src/dist/vendor-aurelia": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
      includes: [
        'aurelia-bootstrapper',
        'aurelia-framework',
        'aurelia-fetch-client',
        //'aurelia-router',
        // 'aurelia-animator-css',
         'aurelia-templating-binding',
        // 'aurelia-templating-resources',
         'aurelia-templating-router',
        'aurelia-router',
        'aurelia-history-browser',
         'aurelia-logging-console',
        'aurelia-event-aggregator',
        'aurelia-loader-default',
        'aurelia-loader',
        'aurelia-i18n',
        'i18next-xhr-backend'
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "src/dist/vendor-build": {
      includes: [
        'text',
        'fetch',
        'lodash'
      ],
      options: {
        inject: true,
        minify: true
      }
    }

  }
};

gulp.task('bundle', function() {
  return bundle(config);
});
