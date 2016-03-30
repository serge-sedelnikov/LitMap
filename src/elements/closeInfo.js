import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import ma from '../elements/mediaAdjuster'
import {I18N} from 'aurelia-i18n';

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

//convert distance into visibility. if 0, hide the tile.
export class DistanceToVisibilityValueConverter{
  toView(value){
    return (value == 0 ? "none" : "inherit");
  }
}

@inject(I18N, HttpClient, Element)
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
