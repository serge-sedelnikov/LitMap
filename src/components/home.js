import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import _ from 'lodash';

@inject(I18N, HttpClient, Element)
export class Home{

  //search query as bindable
  @bindable query;

  //constructor
  constructor(I18N, HttpClient, Element){
    this.http = HttpClient;
    this.i18n = I18N;
    this.element = Element;
    this.infos = [];
    this.closestInfos = [];
    this.searchResult = [];
    this.searchBase = [];
    this.query = '';
  }

  //executes on activate
  activate(){
    let p1 = this.fetchIndex();
    p1.then((infos)=>{
      //get the most interesting this week
      //meaning get last 8 articles
      this.infos = _.reverse(_.takeRight(infos, 8));

      //load up thumbs and full articles for search
      this.searchBase = infos;
      this.fillUpSearchBaseData(this.searchBase);

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

  //search base to be filled up
  fillUpSearchBaseData(searchBase){
    _.forEach(searchBase, s => {
      //load up thumb article text
      this.http.fetch('data/thumbs/'+ s.data + '.md')
        .then(r => {
          return r.text();
        })
        .then(t=>{
          s.text = t;
        });

      //load up full article text
      this.http.fetch('data/full/'+ s.data + '.md')
        .then(r => {
          return r.text();
        })
        .then(t=>{
          s.fullText = t;
        });
    });
  }

  //on search query changed
  queryChanged(newValue){

    //if no search query, or search query less than 3 characters, skip
    if(!newValue || newValue.length < 3){
      this.searchResult = [];
      return;
    }

    let searchedItems = _.filter(this.searchBase, i => {
        return i.text.toLowerCase().indexOf(newValue.toLowerCase()) != -1 ||
          i.fullText.toLowerCase().indexOf(newValue.toLowerCase()) != -1;
    });

    console.log(searchedItems);
    //set up for screen if there was a differennce
    let difference = _.differenceWith(searchedItems, this.searchResult, _.isEqual);
    if(difference.length > 0){
      this.searchResult = searchedItems;
    }
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
