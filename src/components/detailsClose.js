import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import _ from 'lodash';

@inject(I18N, HttpClient, Element)
export class DetailsClose{
  @bindable parentData;

  constructor(i18n, http, Element){
    this.http = http;
    this.i18n = i18n;
    this.element = Element;
    this.data = '';
    this.closeInfos = [];
    this.self = this;
  }

  //om view activated
  parentDataChanged(){
    //fetch index to show close data and interesting data
    return this.fetchIndex();
  }

  bind(){
    //fetch index to show close data and interesting data
    return this.fetchIndex();
  }

  //fetching index file and show data on screen
  fetchIndex(){
    //order them by didtance
    let p1 = new L.LatLng(this.parentData.pos[0], this.parentData.pos[1]);

    return this.http.fetch('data/index.json')
    .then(response=>{
      //convert text to json
      return response.json()
    })
    .then(json=>{
        let infos = json;



        this.closeInfos = _.sortBy(infos, (info)=>{

        let p2 = new L.LatLng(info.pos[0], info.pos[1]);
        info.distance = p1.distanceTo(p2).toFixed(0);
        return parseInt(info.distance);

        });
      });
  }
}
