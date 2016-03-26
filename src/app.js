import "github:components/jquery@2.2.1/jquery.min.js";
import "bootstrap/js/bootstrap.min.js";
import {I18N, BaseI18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(I18N, Element, EventAggregator)
export class App {

  constructor(i18n, element, ea){
    this.i18n = i18n;
    this.i18n.setLocale('ru');
  }

  configureRouter(config, router) {
    config.title = this.i18n.i18next.t('app.title');
    config.map([
      { route: ['','map'], name: 'map', moduleId: './components/map', nav: true, title:this.i18n.i18next.t('app.mapNav') }
    ]);

    this.router = router;
  }
}
