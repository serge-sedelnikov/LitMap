import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import _ from 'lodash';

@inject(I18N, HttpClient, Element)
export class Home{

  //constructor
  constructor(I18N, HttpClient, Element){
    this.http = HttpClient;
    this.i18n = I18N;
    this.element = Element;
    this.infos = [];
    this.closestInfos = [];
  }

  //executes on activate
  activate(){
    let p1 = this.fetchIndex();
    p1.then((infos)=>{
      //get the most interesting this week
      this.infos = infos;
      //get closest to the user in 10 km.
      return this.getClosestToMe(infos);
    }).then(ci =>{
      this.closestInfos = ci;
    });
  }

  //fetching index file and show data on screen
  fetchIndex(){
    return this.http.fetch('data/index.json')
        .then(response=>{
          //convert text to json
          return response.json()
        })
        .then(json=>{
            let infos = json;
            return infos;
          });
  }

  //gets the closes to the current user
  getClosestToMe(infos){
    if(!navigator.geolocation)
      return [];

      return [];
  }
}
