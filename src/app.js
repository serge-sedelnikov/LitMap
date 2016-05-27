import $ from "bootstrap";
import {I18N, BaseI18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(I18N, Element, EventAggregator)
export class App {

  constructor(i18n, element, ea){
    this.i18n = i18n;
    this.i18n.setLocale('ru');

    //initialize map access
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5c2VkZWxuaWtvdiIsImEiOiJjaW05NzZucDEwMDBnd2RtOGo0N3U4YTJ4In0.BnhUwye9rhjh9z2124wkQA';
  }

  configureRouter(config, router) {
    config.title = this.i18n.i18next.t('app.title');
    config.map([
      { route: ['','home'], name: 'home', moduleId: './components/home', nav: true, title:'Главное' },
      { route: ['map'], name: 'map', moduleId: './components/map', nav: true, title:'Карта' },
      { route: [':data'], name: 'details', moduleId: './components/details', nav: false, title:'Детали' },
      { route: ['feedback'], name: 'feedback', moduleId: './components/feedback', nav: true, title:'Обсудить' },
      { route: ['adm'], name: 'admin', moduleId: './components/admin', nav: true, title:this.i18n.i18next.t('app.admin') }
    ]);

    this.router = router;
  }
}
