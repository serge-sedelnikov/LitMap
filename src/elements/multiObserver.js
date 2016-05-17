import {ObserverLocator} from 'aurelia-framework'; // or 'aurelia-binding'

export class MultiObserver {
  static inject() { return [ObserverLocator]; }
  constructor(observerLocator) {
    this.observerLocator = observerLocator;
  }

  observe(properties, callback) {
    var subscriptions = [], i = properties.length, object, propertyName;
    while(i--) {
      object = properties[i][0];
      propertyName = properties[i][1];
      let sub = this.observerLocator.getObserver(object, propertyName).subscribe(callback);
      subscriptions.push(sub);
    }

    // return dispose function
    return () => {
      while(subscriptions.length) {
        let sub = subscriptions.pop();
        //sub();
      }
    }
  }
}
