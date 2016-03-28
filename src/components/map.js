import _ from "lodash";
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import m from 'markdown';
import {I18N} from 'aurelia-i18n';

@inject(I18N, HttpClient)
export class Map{

  constructor(i18bn, http){
    this.self = this;
    self.http = http;
    self.i18bn = i18bn;
  }

  //fetching markers from the backend and putting them on the map
  fetchMarkers(points, map){
    //set up clustering
    var markers = new L.MarkerClusterGroup();
    _.forEach(points, a=>{
        var marker = L.marker(new L.LatLng(a.pos[0], a.pos[1]), {
            icon: L.mapbox.marker.icon(
              {
                'marker-symbol': a.marker,
                'marker-color': a.color,
                'marker-size': 'large'
              }),
            title: 'index'
        });
        //fetch marker text as md and set poopup as html
        self.http.fetch('data/thumbs/' + a.data + '.md')
        .then(d=>{
          return d.text();
        })
        .then(t=>{
          let html = m.markdown.toHTML(t);
          marker.bindPopup('<div class="marker-thumb">' + html + '</div><div class="text-right"><a href="/#/' + a.data + '" class="btn btn-default">' + self.i18bn.i18next.t('map.marker.readMore') + '</a></div>');
          markers.addLayer(marker);
        })
    });

    map.addLayer(markers);
  }

  fetchIndex(map){
      self.http.fetch('data/index.json')
      .then(response=>{
        //convert text to json
        return response.json()
      })
      .then(json=>{
        //once file downloaded, fetch markers
        this.fetchMarkers(json, map)
      })
  }

  //on attached to DOM
  attached(){

    //initialize map access
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5c2VkZWxuaWtvdiIsImEiOiJjaW05NzZucDEwMDBnd2RtOGo0N3U4YTJ4In0.BnhUwye9rhjh9z2124wkQA';
    
    self.map = L.mapbox
        .map('map', 'mapbox.streets')
        .setView([57.15000, 65.53333], 12);

    //start loading index file and once its done, fetch markers data.
    //start fetching markers
    this.fetchIndex(self.map);
  }
}
