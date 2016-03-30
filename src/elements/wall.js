import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class Wall{
  @bindable infos;

  constructor(Element){
    this.element = Element;
  }

  bind(){
    this.initWall();
  }

  infosChanged(){
    this.initWall();
  }

  initWall(){
    setTimeout(()=>{
      let containerSelector = '.wall-container';
      let container = $(this.element).find(containerSelector);
      new Masonry(container[0], {
            // options
            itemSelector: '.wall-item',
            percentPosition: true
          });
    }, 500);
  }
}
