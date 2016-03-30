import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import ma from '../elements/mediaAdjuster'

@inject(HttpClient)
export class CloseInfo{
@bindable data;
@bindable details;

  constructor(http){
    this.http = http;
    //init markdown renderer
    this.md = new Remarkable({
      html: true
    });
  }

  bind(){
    //calculate and display distance
    this.distance = this.data.distance;

    //fetch the file with the given link from thumbs
    this.http.fetch('data/thumbs/' +this.data.data + '.md')
    .then(response=>{
      return response.text();
    })
    .then(t=>{
      let html = this.md.render(t);
      html = ma.adjustMedia(html);
      this.html = html;
    });
  }
}

export class DistanceToVisibilityValueConverter{
  toView(value){
    return (value == "0" ? "none" : "inherit");
  }
}

export class ToDistanceViewValueConverter{
  toView(value){
    let num = parseInt(value);
    return (value > 1000 ? (value/1000.0).toFixed(1) : value);
  }
}
