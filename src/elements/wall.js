import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(Element, EventAggregator)
export class Wall{
  @bindable infos;
  @bindable showDistance;

  constructor(Element, ea){
    this.element = Element;
    this.showDistance = true;
  }
}
