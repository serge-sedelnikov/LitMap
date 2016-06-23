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
      //meaning get last 8 articles
      this.infos = _.reverse(_.takeRight(infos, 8));

      //get closest to the user in 10 km.
      return this.getClosestToMe(infos);
    }).then(ci =>{
      this.closestInfos = ci;
    });
  }

  //fetching index file and show data on screen
  fetchIndex(){
    return this.http.fetch('data/index.json?t=' + new Date().getTime())
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

      var prom = new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position=>{
                    var res = {
                        Lat: 0,
                        Lon: 0
                    };
                    res.Lat = position.coords.latitude;
                    res.Lon = position.coords.longitude;
                    resolve(res);
                }, error => {
                    resolve(null);
                });
            } else {
                resolve(null);
            }
        })
        .then(res => {
          if(!res)
            return [];
          let p1 = new L.LatLng(res.Lat, res.Lon);

          //calculate distence and show them ordered by distance
          let sinfos = _.sortBy(infos, (info)=>{
              let p2 = new L.LatLng(info.pos[0], info.pos[1]);
              info.distance = p1.distanceTo(p2).toFixed(0);
              return parseInt(info.distance);
          });

          //filter for closest by 10km distance
          let filtered = _.filter(sinfos, (i)=>{
                return (i.distance > 0) && (i.distance <= (5000 * 1000)); //less than 5000km
              });
          filtered = _.take(filtered, 4); //4 nearest interesting news
          return filtered;
        });

        return prom;
  }
}
