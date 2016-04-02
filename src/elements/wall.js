import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'
import ms from 'masonry-layout';

@inject(Element, EventAggregator)
export class Wall{
  @bindable infos;

  constructor(Element, ea){
    this.element = Element;


  }

  attached(){
    this.initWall();
  }

  // infosChanged(){
  //   this.initWall();
  // }

  initWall(){

    setTimeout(()=>{
      let containerSelector = '.wall-container';
      let container = $(this.element).find(containerSelector);
      this.wall = new ms(container[0], {
            // options
            itemSelector: '.wall-item',
            percentPosition: true,
            transitionDuration: '0s'
          });
      this.wall.layout();
    }, 300);
  }
}
