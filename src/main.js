import {I18N} from 'aurelia-i18n';
import XHR from 'i18next-xhr-backend'; // <-- your previously installed backend plugin

  export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin('aurelia-i18n', (instance) => {
        // register backend plugin
        instance.i18next
        .use(XHR)
        .init({
          backend: {
            loadPath: 'content/locales/{{lng}}.json'
          },
          lng : 'ru',
          attributes : ['t','i18n'],
          fallbackLng : 'en',
          debug : true,
          ns: ['translation'],
          defaultNS: "translation",
          fallbackNS: "translation"
          });
          console.log("init od XHR done");
      });



    aurelia.start().then(a => a.setRoot());
  }
