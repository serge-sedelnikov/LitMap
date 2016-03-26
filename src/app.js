import {I18N, BaseI18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(I18N, Element, EventAggregator)
export class App {
  message = 'Welcome to Aurelia!';

  constructor(i18n, element, ea){
    this.i18n = i18n;
    this.i18n.setLocale('en-US');
  }

  attached(){
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5c2VkZWxuaWtvdiIsImEiOiJjaW05NzZucDEwMDBnd2RtOGo0N3U4YTJ4In0.BnhUwye9rhjh9z2124wkQA';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([57.15000, 65.53333], 12);
  }

  selLocale(){
    this.i18n.setLocale('ru')
            .then( () => {
            // locale is loaded
              console.log('locale loaded');
        });
  }
}
