import $ from "bootstrap";
import {I18N, BaseI18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {UserInfo} from 'elements/userInfo';

@inject(I18N, Element, EventAggregator)
export class App {

  constructor(i18n, element, ea){
    this.i18n = i18n;
    this.i18n.setLocale('ru');

    //initialize map access
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5c2VkZWxuaWtvdiIsImEiOiJjaW05NzZucDEwMDBnd2RtOGo0N3U4YTJ4In0.BnhUwye9rhjh9z2124wkQA';

    //initialize VK authentication
    VK.init({
        apiId: 5483036
      });
  }

  configureRouter(config, router) {

    var menuItems = [
      { route: ['','home'], name: 'home', moduleId: './components/home', nav: true, title:'Главное', settings: {roles: []} },
      { route: ['map'], name: 'map', moduleId: './components/map', nav: true, title:'Карта', settings: {roles: []} },
      { route: [':data'], name: 'details', moduleId: './components/details', nav: false, title:'Детали', settings: {roles: []} },
      { route: ['feedback'], name: 'feedback', moduleId: './components/feedback', nav: true, title:'Обсудить', settings: { target: 'blank', roles: []} },
      { route: ['http://xn--l1adgmc.xn----itbklch6ag0gq.xn--p1ai/'], name: 'forum', moduleId: 'http://xn--l1adgmc.xn----itbklch6ag0gq.xn--p1ai/', nav: true, title:'Форум', settings: {roles: []} },
      { route: ['adm'], name: 'admin', moduleId: './components/admin', nav: false, title: 'Админ', settings: {roles: ["admin"]} }
    ];

    config.title = "Литературная карта Тюмени";

    //add authorize step for admin access
    config.addPipelineStep('authorize', AuthorizeStep);

    //map right menu items if admin or not
    config.map(menuItems);

    this.router = router;
  }
}

//authorization step for application

@inject(UserInfo)
class AuthorizeStep{

  //constructor
  constructor(userInfo){
    this.userInfo = userInfo;
  }

  //run pipe method
  run(navigationInstruction, next) {
    //use VK authorization
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf('admin') !== -1)) {
      if (!this.userInfo.isLoggedIn) {
        return next.cancel(new Redirect(''));
      }
    }
    return next();
  }
}
