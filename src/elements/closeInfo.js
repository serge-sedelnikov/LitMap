import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import ma from '../elements/mediaAdjuster'
import {I18N} from 'aurelia-i18n';
import Remarkable from 'remarkable';

@inject(HttpClient, Element)
export class CloseInfo{
@bindable data; //details to display
@bindable showDistance;

  //constructor
  constructor(http, Element){
    this.http = http;
    //init markdown renderer
    this.md = new Remarkable({
      html: true
    });
    this.element = Element;
    this.showDistance = true;
    this.html = "";
  }

  //once bindings applied
  bind(){
    //fetch the file with the given link from thumbs
    return this.http.fetch('data/thumbs/' +this.data.data + '.md')
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


//converts distance to text
@inject(I18N)
export class ToDistanceViewValueConverter{

  constructor(I18N){
    this.i18n = I18N;
  }

  toView(value){
    let num = parseInt(value);

    var resDist = (num > 1000 ? (num/1000.0).toFixed(1) : value);
    var resUnit = (num > 1000 ? this.i18n.i18next.t("closeInfo.kilometers") : this.i18n.i18next.t("closeInfo.meters"));

    return resDist + ' ' + resUnit;
  }
}
