import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(Element, EventAggregator)
export class Wall{
  @bindable infos;

  constructor(Element, ea){
    this.element = Element;
  }

  attached(){
    this.initWall();
  }

  infosChanged(){
    this.initWall();
  }

  initWall(){
    let containerSelector = '.wall-container';
    let container = $(this.element).find(containerSelector);
    this.wall = new Masonry(container[0], {
          // options
          itemSelector: '.wall-item',
          percentPosition: true,
          transitionDuration: '0.2s'
        });
    setTimeout(()=>{
      this.wall.layout();
    }, 700);
  }
}
