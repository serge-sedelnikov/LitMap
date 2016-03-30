import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class Wall{
  @bindable infos;

  constructor(Element){
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
    var wall = new Masonry(container[0], {
          // options
          itemSelector: '.wall-item',
          percentPosition: true,
          transitionDuration: '0.2s'
        });
    setTimeout(()=>{
      wall.layout();
    }, 500);
  }
}
