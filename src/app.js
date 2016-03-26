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

  selLocale(){
    this.i18n.setLocale('ru')
            .then( () => {
            // locale is loaded
              console.log('locale loaded');
        });
  }
}
