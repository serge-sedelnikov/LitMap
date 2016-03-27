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

    self.points = [{
      pos: [57.153525, 65.514422],
      color: "#49ACF2",
      marker: 'park',
      data: 'data1'
    },
    {
      pos: [57.145169, 65.577218],
      color: "#49ACF2",
      marker: 'park2',
      data: 'data1'
    },
    {
      pos: [57.148405, 65.567143],
      color: "#49ACF2",
      marker: 'monument',
      data: 'data2'
    },
    {
      pos: [57.133828, 65.550730],
      color: "#F53155",
      marker: 'building',
      data: 'data2'
    },
    {
      pos: [57.144173, 65.526712],
      color: "#49ACF2",
      marker: 'theatre',
      data: 'data2'
    },
    {
      pos: [57.134690, 65.561341],
      color: "#F53155",
      marker: 'building',
      data: 'data1'
    }];
  }

  //fetching markers from the backend and putting them on the map
  fetchMarkers(map){
    //set up clustering
    var markers = new L.MarkerClusterGroup();
    _.forEach(self.points, a=>{
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
        self.http.fetch('data/' + a.data + '.md')
        .then(d=>{
          return d.text();
        })
        .then(t=>{
          let html = m.markdown.toHTML(t);
          marker.bindPopup('<div class="marker-thumb">' + html + '</div><div class="text-right"><a href="/#/gogol" class="btn btn-default">' + self.i18bn.i18next.t('map.marker.readMore') + '</a></div>');
          markers.addLayer(marker);
        })
    });

    map.addLayer(markers);
  }

  //on attached to DOM
  attached(){
    //initialize map access
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2VyZ2V5c2VkZWxuaWtvdiIsImEiOiJjaW05NzZucDEwMDBnd2RtOGo0N3U4YTJ4In0.BnhUwye9rhjh9z2124wkQA';
    self.map = L.mapbox
        .map('map', 'mapbox.streets')
        .setView([57.15000, 65.53333], 12);


    //start fetching markers
    this.fetchMarkers(self.map);
  }
}
